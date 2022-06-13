import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {useQuery} from "@apollo/client";
import {QUERY_GAMES} from "../../api-client";

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

function LoadingPage({ id }: Props): React.ReactElement {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_GAMES);
  
  if (!loading){
    const randomGameID = Math.round(Math.random() * data.games.length); 
    setTimeout(() => navigate(`/Game/SongIntro`,{state : randomGameID}), 2000);
  }  
  return (
    <>
      <Container>
        <TitleContainer>음악 뽑는 중...</TitleContainer>
        <LoadingOutlined style={{ fontSize: '48px', color: '#08c' }} />
      </Container>
      <InputContainer>
        <Input />
        <Button type="primary">submit</Button>
      </InputContainer>
    </>
  );
}

export default LoadingPage;
