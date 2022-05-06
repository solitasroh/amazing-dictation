import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
const TitleContainer = styled.div`
  color: #ffffff;
  align-items: center;
  font-family: 'JejuHallasan';
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 129px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 129px;
`;

function ResultPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state as { answer: boolean; lyrics: string };
  const result = data?.answer ? '정답' : '실패';
  const [nextStage, setNextStage] = useState('');

  useEffect(() => {
    if (result === '실패') {
      setNextStage('힌트를 볼까요?');
    } else {
      setNextStage('다음 게임으로?');
    }
  }, []);
  const onClick = () => {
    if (result === '실패') {
      navigate(`/Game/Hint`, { state: data?.lyrics });
    } else {
      navigate(`/Game/Loading`);
    }
  };
  return (
    <>
      <Container>
        <TitleContainer>{result}</TitleContainer>
      </Container>
      <ButtonContainer>
        <Button type="primary" onClick={onClick}>
          {nextStage}
        </Button>
      </ButtonContainer>
    </>
  );
}

export default ResultPage;
