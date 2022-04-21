import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  id: number;
}
interface TimeProps {
  isTimeUp?: boolean;
  isTimeDown?: boolean;
}
const boxAnimation = keyframes`
 from {   
  opacity: 0;
    transform: translateY(-100%);
  }
  to { 
  transform: translateY(0);
  opacity: 1;
  }
`;
const boxAnimation2 = keyframes`
 from {   
  transform: translateY(0);
  opacity: 1;
  }
  to { 
    opacity: 0;
    transform: translateY(100%);
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #979797;
`;
const TimerContainer = styled.div`
  position: relative;
  width: 80px;
  height: 60px;
  font-size: 48px;
  font-family: 'Montserrat';
`;

const TimerChange = styled.div<TimeProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  animation: ${boxAnimation} 3 1s;
`;
const TimerChange1 = styled.div<TimeProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${boxAnimation2} 3 1s;
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

function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}): React.ReactElement {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(0);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val: number) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;
  return (
    <TimerContainer>
      <TimerChange>{remainingTime}</TimerChange>
      {prevTime.current !== 0 && (
        <TimerChange1>{prevTime.current}</TimerChange1>
      )}
    </TimerContainer>
  );
}

function SongIntroPage({ id }: Props): React.ReactElement {
  const navigate = useNavigate();

  const onComplete = (): void => {
    navigate(`/Game/Play`);
  };
  return (
    <>
      <Container>
        <TitleContainer>노래 제목</TitleContainer>
        <CountdownCircleTimer
          isPlaying
          duration={3}
          colors={['#004777', '#F7B801', '#A30000']}
          colorsTime={[3, 2, 0]}
          onComplete={onComplete}
        >
          {RenderTime}
        </CountdownCircleTimer>
      </Container>
      <InputContainer>
        <Input />
        <Button type="primary">submit</Button>
      </InputContainer>
    </>
  );
}

export default SongIntroPage;
