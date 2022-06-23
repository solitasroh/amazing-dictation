import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';

@Injectable()
export class S3FileService {
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadAsync(id, fileName: string, filePath: string): Promise<string> {
    const fileContents = readFileSync(filePath);
    const fileKey = `${id}-${Date.now()}-test.mp3`;

    console.log(`FILE: ${fileKey}`);
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: fileKey,
      ACL: 'public-read',
      Body: fileContents,
    };
    const { Location } = await this.s3.upload(params).promise();
    console.log(`S3 URL: ${Location}`);
    return Location;
  }
}
