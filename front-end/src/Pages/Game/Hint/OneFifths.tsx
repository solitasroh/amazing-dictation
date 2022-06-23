import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import ReplayBtn from '../../../Components/ReplayBtn';
import SongInfo from '../../../Components/SongInfo';
import IGame from '../../../types/IGame';
import IHint from '../../../types/IHint';

interface Props {
  id: number;
}
interface WordsProps {
  active?: boolean;
}
interface ArrayProps {
  id: number;
  data: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;
const WordAnimation = keyframes`
from{
  
  transform: rotateY(0deg);
}
  to {    
    transform: rotateY(0deg);
  }
`;
const WordsBox = styled.div<WordsProps>`
  display: flex;
  font-family: 'cookie_reg';
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffe600;
  background-color: white;
  border-radius: 5px;
  ${props =>
    props.active &&
    css`
      animation: ${WordAnimation} 0.2s;
    `}
`;

function OneFifths({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as { Info: IHint; songInfo: IGame };
  const lyrics = word.Info.Lyrics.map(value =>
    value.filter(data => data !== ' '),
  );
  const lyricsArray = lyrics.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    [],
  );
  const [questionArray, setQuestionArray] = useState<ArrayProps[][]>([]);
  const [wordArray, setWordArray] = useState<ArrayProps[][]>([]);
  const [rotate, setRotate] = useState(false);

  const endAnimation = () => {
    setWordArray([...questionArray]);
  };

  useEffect(() => {
    for (let i = 0; i < lyricsArray.length; i += 1) {
      const j = Math.floor(Math.random() * lyricsArray.length);
      const tmp = lyricsArray[i];
      lyricsArray[i] = lyricsArray[j];
      lyricsArray[j] = tmp;
    }
    const tmp = new Array<ArrayProps[]>();
    for (let i = 0; i < lyrics.length; i += 1) {
      tmp.push([]);
      for (let j = 0; j < lyrics[i].length; j += 1) {
        tmp[i].push({ id: j, data: lyricsArray[j + i * lyrics[i].length] });
      }
    }
    setWordArray(tmp);
  }, [rotate]);

  useEffect(() => {
    const array = new Array<ArrayProps[]>();
    for (let i = 0; i < lyrics.length; i += 1) {
      array.push([]);
      for (let j = 0; j < lyrics[i].length; j += 1) {
        array[i].push({ id: j, data: '?' });
      }
    }
    setQuestionArray(array);
    setWordArray(array);
    const timeout = setTimeout(() => setRotate(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <TransparentContainer>
        <SongInfo title={word?.Info.title} singer={word?.Info.singer} />
        <LyricsContainer>
          {wordArray.map((value, index) => (
            <RowContainer key={word.Info.key[index]}>
              {value.map((value1, ind) => (
                <WordsBox
                  active={rotate}
                  key={value1.id}
                  onAnimationEnd={endAnimation}
                >
                  {value1.data}
                </WordsBox>
              ))}
            </RowContainer>
          ))}
        </LyricsContainer>
        <ReplayBtn
          id={word.songInfo.id}
          title={word.Info.title}
          singer={word.Info.singer}
          preSectionLyrics={word.songInfo.preSectionLyrics}
          postSectionLyrics={word.songInfo.postSectionLyrics}
          questionLyrics={word.songInfo.questionLyrics}
          preSectionPlayStartTime={word.songInfo.preSectionPlayStartTime}
          preSectionPlayEndTime={word.songInfo.preSectionPlayEndTime}
          questionSectionPlayStartTime={
            word.songInfo.questionSectionPlayStartTime
          }
          questionSectionPlayEndTime={word.songInfo.questionSectionPlayEndTime}
          songYoutubeLinkUrl={word.songInfo.songYoutubeLinkUrl}
          musicFileLinkUrl={word.songInfo.musicFileLinkUrl}
        />
      </TransparentContainer>
    </Container>
  );
}

export default OneFifths;
