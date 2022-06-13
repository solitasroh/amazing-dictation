import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IGame from '../../types/IGame';
import IHint from '../../types/IHint';

interface Props {
  id: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height:400px;
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
  background: rgba(70, 70, 70, 0.86);
  box-shadow: 2px 5px 1px 1px rgba(141, 115, 22, 0.94);  
  border-radius: 10px;    
  backdrop-filter: blur(30px);
`;
const HintContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const HintBox = styled.div`
  display: flex;
  width: 150px;
  height: 120px;
  align-items: center;
  justify-content: center;
  font-family: 'cookie_reg';  
  cursor: pointer;
  background: rgba(255, 193, 7, 0.8);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  font-size: 25px;
  color : white;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  text-shadow: 2px 4px 2px black;
`;
function HintPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as {Info: IHint ; songInfo :IGame};
  console.log(word);
  const navigate = useNavigate();
  return (
    <Container>
      <TransparentContainer>
        <HintContainer>
          <HintBox
            onClick={() => navigate(`/Game/Hint/Spacing`, { state: word })}
          >
            전체 띄어쓰기
          </HintBox>
          <HintBox onClick={() => navigate(`/Game/Hint/Word`, { state: word })}>
            한글자
          </HintBox>
          <HintBox onClick={() => navigate(`/Game/Hint/Inital`, { state: word })}>
            초성
          </HintBox>
        </HintContainer>
        <HintContainer>
          <HintBox>70% 듣기</HintBox>
          <HintBox onClick={() => navigate(`/Game/Hint/OneFifths`, {state: word})}>
            5분의 1초
          </HintBox>
        </HintContainer>
      </TransparentContainer>
    </Container>
  );
}

export default HintPage;
