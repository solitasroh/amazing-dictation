import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
const IyricsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SecretWordsBox = styled.div`
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
function SpacingHint({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as string;
  const secretWord = Array.from(word);
  console.log(secretWord);
  return (
    <Container>
      <IyricsContainer>
        {secretWord.map((value, index) => (
          <SecretWordsBox key={value}>{value}</SecretWordsBox>
        ))}
      </IyricsContainer>
    </Container>
  );
}

export default SpacingHint;
