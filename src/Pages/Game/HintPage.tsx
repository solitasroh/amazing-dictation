import { ThunderboltOutlined, ThunderboltTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  background: #979797;
`;
const HintContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const HintBox = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  border: 1px solid white;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 20px;
`;
function HintPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as { lyrics: string };
  console.log(word);
  const navigate = useNavigate();
  return (
    <Container>
      <HintContainer>
        <HintBox
          onClick={() => navigate(`/Game/Hint/Spacing`, { state: word })}
        >
          전체 띄어쓰기
        </HintBox>
        <HintBox>한글자</HintBox>
        <HintBox>초성</HintBox>
      </HintContainer>
      <HintContainer>
        <HintBox>70% 듣기</HintBox>
        <HintBox>
          5분의 1초
          <ThunderboltTwoTone
            twoToneColor="#ffd900"
            style={{ fontSize: '40px' }}
          />
        </HintBox>
      </HintContainer>
    </Container>
  );
}

export default HintPage;
