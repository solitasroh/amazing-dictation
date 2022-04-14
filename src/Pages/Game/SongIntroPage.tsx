import { Button, Input } from 'antd';
import React from 'react';
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
const InputContainer = styled.div`
  display: flex;
`;
function SongIntroPage({ id }: Props): React.ReactElement {
  return (
    <>
      <Container>
        <TitleContainer>노래 제목</TitleContainer>
      </Container>
      <InputContainer>
        <Input />
        <Button type="primary">submit</Button>
      </InputContainer>
    </>
  );
}

export default SongIntroPage;
