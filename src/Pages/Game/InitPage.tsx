import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import startImage from '../../Assets/startButton3.png';
import startChangeImage from '../../Assets/startButton1.png';

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
  background: #979797;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  left: 223px;
  top: 186px;
  align-items: center;
  justify-content: center;
  background: #f07a7a;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 77px;
  color: #ffffff;
`;
const StartButton = styled.div`
  display: flex;
  top: 100px;
  cursor: pointer;
`;
const InputContainer = styled.div`
  display: flex;
`;
function InitPage({ id }: Props): React.ReactElement {
  const [over, setOver] = useState(false);
  return (
    <>
      <Container>
        <TitleContainer>방구석 놀토</TitleContainer>
        <StartButton onMouseOver={() => setOver(!over)}>
          <img alt="test" src={over ? startChangeImage : startImage} />
        </StartButton>
      </Container>
      <InputContainer>
        <Input />
        <Button type="primary">submit</Button>
      </InputContainer>
    </>
  );
}

export default InitPage;
