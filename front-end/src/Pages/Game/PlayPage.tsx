/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import MusicPlay from '../../Components/MusicPlay';
import CountDown from '../../Components/CountDown';
import SongInfo from '../../Components/SongInfo';
import Music from '../../Assets/Song/BOM.mp3';
import ModalCountDown from '../../Components/ModalCountDown';
import IGame from '../../types/IGame';
import IHint from '../../types/IHint';

interface Props {
  id: number;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const TransparentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  align-items: center;
  justify-content: space-around;
  background: rgba(135, 135, 135, 0.86);
  box-shadow: 2px 5px 1px 1px rgba(141, 115, 22, 0.94);
  border-radius: 10px;
`;
const RowContainer = styled.div`
  display: flex;
`;
const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
`;
const ShowLyrics = styled.div`
  font-weight: 200;
  font-size: 20px;
  line-height: 50px;
  color: #ffffff;
  font-family: 'cookie_reg';
`;
const SecretLyrics = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'cookie_reg';
`;
const SecretWords = styled.div`
  display: flex;
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffe600;
  background-color: white;
  border-radius: 5px;
`;
const CounterAnimation = keyframes`
 from {   
  transform: translatex(0);
  }
  to { 
    transform: translateX(-10px);
  }
`;
const CounterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-size: medium;
  font-weight: 500;
  color: #970c0c;
  animation: ${CounterAnimation} 10 1s;
`;

const InputContainer = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

function PlayPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const songInfo = location?.state as IGame;
  const inputValue = useRef<string>('');
  const songId = new Array<number>();
  const secretSongArray = Array.from(songInfo.questionLyrics as string[]);
  const secretSong = secretSongArray.map(value => Array.from(value));
  const secretWord = secretSong.map(value =>
    value.filter(data => data !== ' '),
  );

  const correct = secretWord
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
    .join(''); // Correct Answer without Spacing (no array)

  const [lyricsShowing, setLyricsShowing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [runningTime, setRunningTime] = useState(0);
  const pauseTime = useRef(0);
  const countTime = songInfo.questionSectionPlayEndTime as number;
  const [audio, setAudio] = useState(new Audio(songInfo.musicFileLinkUrl));

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.floor(audio.currentTime) === songInfo.questionSectionPlayStartTime
      ) {
        audio.pause();
        setIsModalVisible(true);
        clearInterval(interval);
        pauseTime.current = audio.currentTime;
      } else {
        if (
          Math.floor(audio.currentTime) === songInfo.preSectionPlayStartTime
        ) {
          setLyricsShowing(true);
        }
        setRunningTime(runningTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [runningTime]);

  const pauseEnd = () => {
    setIsModalVisible(false);
    audio.currentTime = pauseTime.current;
    audio.play();
  };
  const onChange = (value: string) => {
    inputValue.current = value;
  };

  const onclick = (): void => {
    audio.pause();
  };
  const checkAnswer = (): void => {
    audio.pause();
    const answer = correct === inputValue.current.replace(/(\s*)/g, '');
    const Info: IHint = {
      title: songInfo.title,
      singer: songInfo.singer,
      Lyrics: secretSong,
      key: songId,
    };
    navigate(`/Game/Result`, { state: { answer, Info, songInfo } });
  };

  useEffect(() => {
    for (let i = 0; i < secretWord.length; i += 1) {
      for (let j = 0; j < secretWord[i].length; j += 1)
        songId.push(j + i * secretWord[i].length);
    }
    audio.play();
    setRunningTime(audio.currentTime);
  }, []);

  return (
    <Container>
      <TransparentContainer>
        {lyricsShowing ? (
          <>
            <CounterContainer>
              <CountDown
                time={countTime + 10}
                onComplete={checkAnswer}
                size={30}
              />
            </CounterContainer>
            <SongInfo title={songInfo?.title} singer={songInfo?.singer} />
            <LyricsContainer>
              <ModalCountDown
                time={3}
                isVisible={isModalVisible}
                onEnd={pauseEnd}
              />
              <ShowLyrics>{songInfo.preSectionLyrics}</ShowLyrics>
              <SecretLyrics>
                {secretWord.map((value, index) => (
                  <RowContainer key={songId[index]}>
                    {value.map((value1, ind) => (
                      <SecretWords key={songId[ind + index * ind]}>
                        {ind + secretWord[index].length * index + 1}
                      </SecretWords>
                    ))}
                  </RowContainer>
                ))}
              </SecretLyrics>
              <ShowLyrics>{songInfo.postSectionLyrics}</ShowLyrics>
            </LyricsContainer>
          </>
        ) : (
          <RowContainer>
            <MusicPlay />
          </RowContainer>
        )}
      </TransparentContainer>
      <InputContainer>
        <Input onChange={e => onChange(e.target.value)} />
        <Button type="primary" onClick={checkAnswer}>
          submit
        </Button>
        <Button type="primary" onClick={onclick}>
          stop
        </Button>
      </InputContainer>
    </Container>
  );
}

export default PlayPage;
