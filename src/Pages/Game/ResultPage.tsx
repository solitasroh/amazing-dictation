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
  align-items: center;
  justify-content: center;
  background: #979797;
`;
const TitleContainer = styled.div`
  color: #ffffff;
  align-items: center;
  font-family: 'JejuHallasan';
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 129px;
`;
function ResultPage({ id }: Props): React.ReactElement {
  const { state } = useLocation();
  console.log(state);
  const result = state ? '정답' : '실패';
  return (
    <Container>
      <TitleContainer>{result}</TitleContainer>
    </Container>
  );
}

export default ResultPage;
