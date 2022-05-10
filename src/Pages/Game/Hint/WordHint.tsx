import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

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
  background: #979797;
`;
const LyricsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Helper = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  margin-bottom: 10px;
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
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffe600;
  color: #ffffff;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      animation: ${WordAnimation} 0.5s;
    `}
`;
function WordHint({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as string;
  const wordArray = Array.from(word);
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
      <Helper>보고 싶은 글자 하나를 선택하세요.</Helper>
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
    </Container>
  );
}

export default WordHint;
