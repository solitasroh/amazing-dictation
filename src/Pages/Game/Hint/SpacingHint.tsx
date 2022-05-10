import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  id: number;
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
const WordsBox = styled.div`
  display: flex;
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffe600;
  color: #ffffff;
`;
const SecretAnimation = keyframes`
 from {   
  transform: translatex(0);
  opacity: 0;
  width: 0px;
  }
  to { 
    transform: translateX(-10px);
    opacity:1;
  width: 15px;
  }
`;
const SecretWordsBox = styled.div`
  display: flex;
  font-size: 25px;
  margin: 2px;
  width: 15px;
  opacity: 1;
  align-items: center;
  justify-content: center;
  animation: ${SecretAnimation} 1s;
`;
function SpacingHint({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as string;
  const lyrics = Array.from(word);
  const countArray = new Array<number>();
  let count = 0;
  for (let i = 0; i < lyrics.length; i += 1) {
    if (lyrics[i] !== ' ') {
      count += 1;
      countArray.push(count);
    } else {
      countArray.push(0);
    }
  }
  return (
    <Container>
      <LyricsContainer>
        {lyrics.map((value, index) =>
          lyrics[index] !== ' ' ? (
            <WordsBox key={value}>{countArray[index]}</WordsBox>
          ) : (
            <SecretWordsBox key={value} />
          ),
        )}
      </LyricsContainer>
    </Container>
  );
}

export default SpacingHint;
