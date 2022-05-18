import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import LogoImg from '../../Assets/Logo.png';
import CountDown from '../../Components/CountDown';

interface Props {
  id: number;
}

interface colorProps {
  color: string;
}

const boxAnimation = keyframes`
 from {   
  transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`;
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
const TransparentContainer = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 200px;
  align-items: center;
  justify-content: space-around;
  background: rgba(238, 238, 238, 0.86);
`;
const SongContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.div<colorProps>`
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 77px;
  transform: rotate(-5deg);
  justify-content: center;
  font-family: 'nice';
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: ${prop => prop.color};
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  text-shadow: 2px 4px 2px black;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const CircleContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  border-radius: 50%;
  border-top: 3px solid;
  border-top-color: 
    #ff5f43;
  animation: ${boxAnimation} 3 1s;
`;

function SongIntroPage({ id }: Props): React.ReactElement {
  const songInfo = {
    singer : "소녀시대",
    title : "HOOK"
  }
  const navigate = useNavigate();

  const onComplete = (): void => {
    navigate(`/Game/Play`, {state : songInfo});
  };
  return (
    <Container>
      <LogoContainer>
        <Logo src={LogoImg} />
      </LogoContainer>
      <SongContainer>
        <TransparentContainer>
          <TitleContainer>
            <TitleBox style={{ position: 'relative' }} color="#ffffff">
            {songInfo.singer}
              <TitleBox
                style={{ position: 'absolute', top: 40 }}
                color=" #decd33"
              >
                {songInfo.title}
              </TitleBox>
            </TitleBox>
          </TitleContainer>
          <CircleContainer />
          <CountDown 
          position= 'absolute'
          bottom= {30}
          time ={3}
          onComplete={onComplete}
          />
        </TransparentContainer>
      </SongContainer>
    </Container>
  );
}

export default SongIntroPage;
