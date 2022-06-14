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
  active: boolean;
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
const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RowContainer = styled.div`
  display: flex;
`;
const WordAnimation = keyframes`
from{
  
  transform: rotateY(0deg);
}
  to {    
    transform: rotateY(180deg);
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
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      animation: ${WordAnimation} 0.5s;
    `}
`;
function InitialConsonant({ id }: Props): React.ReactElement {
  const changeHangle = (kor: string) => {
    const f = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];

    return f[parseInt(((kor.charCodeAt(0) - 44032) / 588).toString(), 10)];
  };

  const location = useLocation();
  const word = location?.state as { Info: IHint; songInfo: IGame };
  const wordArray = word?.Info.Lyrics.map(value =>
    value.filter(data => data !== ' '),
  );
  const [initArray, setInitArray] = useState<string[][]>([]);
  const [copyArray, setCopyArray] = useState<string[][]>([]);
  const [rotate, setRotate] = useState<boolean[][]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const init = wordArray.map(value =>
      value.map(data =>
        data.charCodeAt(0) > 44031 && data.charCodeAt(0) < 55204 // Hangle unicode : 44031-55204
          ? changeHangle(data)
          : data,
      ),
    );

    const arrayIndex = wordArray.map((value, index) =>
      value.map((data, ind) =>
        (ind + 1 + index * wordArray[index].length).toString(),
      ),
    );
    const rotateInit = wordArray.map(value => value.map(() => false));

    setRotate(rotateInit);
    setInitArray(init);
    setCopyArray(arrayIndex);
  }, []);

  const onClick = (index: number, ind: number) => {
    const targetWord = initArray[index][ind];
    const array = copyArray.map((value, i) => {
      if (i === index)
        return [...value.slice(0, ind), targetWord, ...value.slice(ind + 1)];
      return value;
    });
    console.log(array);
    setCopyArray(array);

    rotate[index][ind] = true;
    setRotate(rotate);
    setCount(count + 1);
  };
  return (
    <Container>
      <TransparentContainer>
        <SongInfo title={word?.Info.title} singer={word?.Info.singer} />
        <LyricsContainer>
          {copyArray.map((value, index) => (
            <RowContainer key={word.Info.key[index]}>
              {value.map((value1, ind) => (
                <WordsBox
                  key={value1}
                  onClick={() => {
                    if (count < 2) onClick(index, ind);
                  }}
                  active={rotate[index][ind]}
                >
                  {value1}
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

export default InitialConsonant;
