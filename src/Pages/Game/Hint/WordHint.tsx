import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import ReplayBtn from '../../../Components/ReplayBtn';
import SongInfo from '../../../Components/SongInfo';

interface Props {
  id: number;
}
interface WordsProps {
  active: boolean;
}
interface SongProps{
  singer : string;
  title : string;
  lyrics : string;
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
  const word = location?.state as SongProps;
  const wordArray = Array.from(word?.lyrics);
  const [copyWord, setCopyWord] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [rotate, setRotate] = useState<boolean[]>([]);
  useEffect(() => {
    const copy = wordArray
      .filter(data => data !== ' ')
      .map((value, index) => (index + 1).toString());
    setCopyWord(copy);
  }, []);

  const onClick = (index: number) => {
    const targetWord = wordArray.filter(data => data !== ' ')[index];
    setCopyWord(prev => [
      ...prev.slice(0, index),
      targetWord,
      ...prev.slice(index + 1),
    ]);

    setCount(100);
    rotate[index] = true;
    setRotate(rotate);
  };
  return (
    <Container>
      <TransparentContainer>
       <SongInfo title={word?.title} singer={word?.singer}/>
        <LyricsContainer>
          {copyWord.map((value, index) => (
            <WordsBox
              key={value}
              onClick={() => {
                if (count === 0) onClick(index);
              }}
              active={rotate[index]}
            >
              {value}
            </WordsBox>
          ))}
        </LyricsContainer>
        <ReplayBtn title={word.title} singer={word.singer} lyrics = {word.lyrics}/>
      </TransparentContainer>
    </Container>
  );
}

export default WordHint;
