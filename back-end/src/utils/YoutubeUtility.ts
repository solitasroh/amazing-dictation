// eslint-disable-next-line @typescript-eslint/no-var-requires
const yt = require('yt-converter');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import * as fs from 'fs';
import { S3FileService } from '../s3-file/s3-file.service';
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export async function makeMp3(
  id: number,
  linkUrl: string,
  callback: (fileLink: string) => void,
): Promise<void> {
  try {
    const infos = await yt.getInfo(linkUrl);

    // infos.formatsAudio.map((audio) => {
    //     console.log(audio.audioQuality, audio.itag);
    // });

    const filteredItem = infos.formatsAudio
      .filter((format) => format.audioQuality === 'AUDIO_QUALITY_LOW')
      .pop();

    const pathname = path.resolve(process.cwd(), 'temp', `${infos.title}.mp3`);

    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }

    yt.convertAudio(
      {
        url: linkUrl,
        itag: filteredItem.itag,
        directoryDownload: 'temp',
      },
      (percentage) => {
        console.log(`${percentage}%`);
      },
      async () => {
        console.log(pathname);
        let retryCount = 0;
        let fileExists = false;
        while (retryCount++ < 10) {
          fileExists = fs.existsSync(pathname);
          console.log('file check..');
          await sleep(1000);
        }

        const list = fs.readdirSync(path.resolve(process.cwd(), 'temp'));
        if (list.length > 0) {
          const filePath = path.resolve(process.cwd(), 'temp', list[0]);

          if (fs.existsSync(filePath)) {
            const service = new S3FileService();
            const fileLink = await service.uploadAsync(
              id,
              infos.title,
              filePath,
            );
            callback(fileLink);
          }
          fs.rmSync(filePath);
        }
      },
    );
  } catch (e) {
    console.log('error', e);
  }
}
