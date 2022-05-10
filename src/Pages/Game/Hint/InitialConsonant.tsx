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
  const word = location?.state as string;
  const wordArray = Array.from(word);
  const [initArray, setInitArray] = useState<string[]>([]);
  const [copyArray, setCopyArray] = useState<string[]>([]);
  const [rotate, setRotate] = useState<boolean[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const init = wordArray
      .filter(data => data !== ' ')
      .map(data =>
        data.charCodeAt(0) > 44031 && data.charCodeAt(0) < 55204 // Hangle unicode : 44031-55204
          ? changeHangle(data)
          : data,
      );
    const index = wordArray
      .filter(data => data !== ' ')
      .map((data, ind) => (ind + 1).toString());

    setInitArray(init);
    setCopyArray(index);
  }, []);

  const onClick = (index: number) => {
    const targetWord = initArray[index];
    setCopyArray(prev => [
      ...prev.slice(0, index),
      targetWord,
      ...prev.slice(index + 1),
    ]);
    rotate[index] = true;
    setRotate(rotate);
    setCount(count + 1);
  };
  return (
    <Container>
      <Helper>확인할 초성 2개를 선택하세요.</Helper>
      <LyricsContainer>
        {copyArray
          .filter(data => data !== ' ')
          .map((value, index) => (
            <WordsBox
              key={value}
              onClick={() => {
                if (count < 2) onClick(index);
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

export default InitialConsonant;
