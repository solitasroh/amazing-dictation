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
function WordHint({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as {Info: IHint ; songInfo :IGame};
  const wordArray = word?.Info.Lyrics;
  const [copyWord, setCopyWord] = useState<string[][]>([]);
  const [count, setCount] = useState(0);
  const [rotate, setRotate] = useState<boolean[]>([]);
  useEffect(() => {
    const copy = wordArray
      .map((value)=> value.filter(data => data !== ' ')
      .map((data, ind) => (ind + 1).toString()));      
    setCopyWord(copy);
  }, []);

  const onClick = (index: number, ind :number) => {
    const targetWord = wordArray.map((value)=> value.filter(data => data !== ' '))[index][ind];
    const array = copyWord.map((value,i) => 
    {
      if(i === index)
        return [
        ...value.slice(0, i),
        targetWord,
        ...value.slice(i + 1),
        ]
      return value;
  });  
    setCopyWord(array);
    // setCopyWord(prev => [
    //   ...prev.slice(0, index),
    //   targetWord,
    //   ...prev.slice(index + 1),
    // ]);

    setCount(100);
    rotate[ind] = true;
    setRotate(rotate);
  };
  return (
    <Container>
      <TransparentContainer>
       <SongInfo title={word?.Info.title} singer={word?.Info.singer}/>
        <LyricsContainer>
        {copyWord
            .map((value, index) => (
            <RowContainer key={word.Info.key[index]}>{
              value.map((value1,ind) => 
                <WordsBox 
                    key={word.Info.key[ind + (index*ind)]}
                    onClick={() => {
                      if (count === 0) onClick(index,ind);
                    }}
                    active={rotate[ind]}
                  >
                    {value1}
                </WordsBox>)}
              </RowContainer>
            ))}          
        </LyricsContainer>
        <ReplayBtn id={word.songInfo.id} title={word.Info.title} singer={word.Info.singer} 
          preSectionLyrics={ word.songInfo.preSectionLyrics}
          postSectionLyrics={word.songInfo.postSectionLyrics}
          questionLyrics={word.songInfo.questionLyrics}
          preSectionPlayStartTime={word.songInfo.preSectionPlayStartTime}
          preSectionPlayEndTime={word.songInfo.preSectionPlayEndTime}
          questionSectionPlayStartTime={word.songInfo.questionSectionPlayStartTime}
          questionSectionPlayEndTime={word.songInfo.questionSectionPlayEndTime}
          songYoutubeLinkUrl={word.songInfo.songYoutubeLinkUrl}
          musicFileLinkUrl ={word.songInfo.musicFileLinkUrl}/>
      </TransparentContainer>
    </Container>
  );
}

export default WordHint;
