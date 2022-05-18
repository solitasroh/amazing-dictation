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
  justify-content: space-around;
`;

const TransparentContainer = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 200px;
  align-items: center;
  justify-content: center;
  background: rgba(238, 238, 238, 0.86);
  box-shadow: 2px 5px 1px 1px rgba(141, 115, 22, 0.94);
  backdrop-filter: blur(30px);    
  border-radius: 10px;
`;
const TitleContainer = styled.div`
  color: #ffffff;
  align-items: center;
  font-family: 'cookie_bold';
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 129px;
  color: #FFC107;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
`;
const ButtonBox = styled.button`
  font-style: normal;
  font-family: 'cookie_reg';
  font-weight: 400;
  font-size: 40px;
  line-height: 129px;
  color :white;
  background: rgba(0, 0, 0, 0.1);  
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  border-radius: 4px;
`;
function ResultPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state as { answer: boolean; lyrics: string };
  const result = data?.answer ? '정답' : '실패';
  const [nextStage, setNextStage] = useState('');

  useEffect(() => {
    if (result === '실패') {
      setNextStage('힌트를 볼까요?>>>');
    } else {
      setNextStage('다음 게임으로?>>>');
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
        <TransparentContainer>
          <TitleContainer>{result}</TitleContainer>
        </TransparentContainer>
      </Container>
      <ButtonContainer>
        <ButtonBox onClick={onClick}>
          {nextStage}
        </ButtonBox>
      </ButtonContainer>
    </>
  );
}

export default ResultPage;
