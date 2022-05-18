import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import ReplayBtn from '../../../Components/ReplayBtn';
import SongInfo from '../../../Components/SongInfo';

interface Props {
  id: number;
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
const WordsBox = styled.div`
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
  const word = location?.state as SongProps;
  const lyrics = Array.from(word.lyrics);
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
      <TransparentContainer>
        <SongInfo title={word?.title} singer={word?.singer}/>
        <LyricsContainer>
          {lyrics.map((value, index) =>
            lyrics[index] !== ' ' ? (
              <WordsBox key={value}>{countArray[index]}</WordsBox>
            ) : (
              <SecretWordsBox key={value} />
            ),
          )}
        </LyricsContainer>
        <ReplayBtn title={word.title} singer={word.singer} lyrics = {word.lyrics}/>
      </TransparentContainer>
    </Container>
  );
}

export default SpacingHint;
