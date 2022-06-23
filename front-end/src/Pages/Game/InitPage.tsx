import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../Assets/Logo.png';

interface Props {
  id: number;
}
interface colorProps {
  color: string;
}

const LogoContainer = styled.div`
  position: relative;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 140px;
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 657px;
  flex-direction: column;
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TransparentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 200px;
  align-items: center;
  justify-content: space-around;
  background: rgba(238, 238, 238, 0.86);
`;

const TitleContainer = styled.div<colorProps>`
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 77px;
  font-family: 'RixYeoljeongdo_Pro';
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: ${prop => prop.color};
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  text-shadow: 2px 4px 2px black;
`;

const StartButton = styled.div`
  display: flex;
  width: 250px;
  justify-content: center;
  font-family: 'vitro_core';
  font-style: normal;
  font-weight: 400;
  font-size: 38px;
  line-height: 77px;
  background: #92c6bc;
  border: 1.5px solid #296868;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-color: #296868;
  -webkit-text-stroke-width: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

function InitPage({ id }: Props): React.ReactElement {
  const [over, setOver] = useState(false);
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate(`/Game/Loading`);
  };

  return (
    <Container>
      <LogoContainer>
        <Logo src={LogoImg} />
      </LogoContainer>
      <SongContainer>
        <TransparentContainer>
          <SongContainer>
            <TitleContainer color="#ffa09d">시작</TitleContainer>
            <TitleContainer color="#ffffff">할 준비가 되었나요?</TitleContainer>
          </SongContainer>
          <StartButton onMouseOver={() => setOver(!over)} onClick={onClick}>
            주크박스 ON
          </StartButton>
        </TransparentContainer>
      </SongContainer>
    </Container>
  );
}

export default InitPage;
