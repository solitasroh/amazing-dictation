import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

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
  background: #979797;
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
    transform: rotateY(0deg);
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
  ${props =>
    props.active &&
    css`
      animation: ${WordAnimation} 0.2s;
    `}
`;

function OneFifths({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as string;
  const lyrics = Array.from(word);
  const lyricsArray = lyrics.filter(data => data !== ' ');
  const [questionArray, setQuestionArray] = useState<ArrayProps[]>([]);
  const [wordArray, setWordArray] = useState<ArrayProps[]>([]);
  const [rotate, setRotate] = useState(false);

  const endAnimation = () => {
    setWordArray([...questionArray]);
  };

  useEffect(() => {
    for (let i = 0; i < lyricsArray.length; i += 1) {
      const j = Math.floor(Math.random() * lyricsArray.length);
      console.log(j);
      const tmp = lyricsArray[i];
      lyricsArray[i] = lyricsArray[j];
      lyricsArray[j] = tmp;
    }
    const tmp: ArrayProps[] = lyricsArray.map((value, idx) => ({
      id: idx,
      data: value,
    }));
    setWordArray(tmp);
    console.log(wordArray);
  }, [rotate]);

  useEffect(() => {
    const array = new Array<ArrayProps>();
    for (let i = 0; i < lyricsArray.length; i += 1) {
      array.push({ id: i, data: '?' });
    }
    setQuestionArray(array);
    setWordArray(array);
    const timeout = setTimeout(() => setRotate(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <LyricsContainer>
        {wordArray.map((data, index) => (
          <WordsBox active={rotate} key={data.id} onAnimationEnd={endAnimation}>
            {data.data}{' '}
          </WordsBox>
        ))}
      </LyricsContainer>
    </Container>
  );
}

export default OneFifths;
