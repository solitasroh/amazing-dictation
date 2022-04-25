import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import MusicPlay from '../../Components/MusicPlay';

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
const RowContainer = styled.div`
  display: flex;
`;
const IyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
`;
const ShowIyrics = styled.div`
  font-weight: 200;
  font-size: 20px;
  line-height: 50px;
  color: #ffffff;
`;
const SecretIyrics = styled.div`
  display: flex;
`;
const SecretWords = styled.div`
  display: flex;
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffe600;
  color: #ffffff;
`;
const CounterAnimation = keyframes`
 from {   
  transform: translatex(0);
  }
  to { 
    transform: translateX(-10px);
  }
`;
const CounterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-size: medium;
  font-weight: 500;
  color: #970c0c;
  animation: ${CounterAnimation} 10 0.5s;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 150px;
  height: 50px;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 30px;
  line-height: 77px;
  color: #ffffff;
`;
const InputContainer = styled.div`
  display: flex;
`;
function PlayPage({ id }: Props): React.ReactElement {
  const inputValue = useRef<string>('');
  const secretSong = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const lyrics = '나는 훗훗훗';
  const [lyricsShowing, setLyricsShowing] = useState(true);
  const onChange = (value: string) => {
    inputValue.current = value;
    console.log(inputValue);
  };

  const navigate = useNavigate();
  const checkAnswer = (): void => {
    const answer = lyrics === inputValue.current;
    navigate(`/Game/Result`, { state: answer });
  };
  return (
    <>
      <Container>
        {lyricsShowing ? (
          <>
            <CounterContainer>
              {' '}
              제한시간: <Countdown date={Date.now() + 10000} />
            </CounterContainer>
            <TitleContainer>노래 제목</TitleContainer>
            <IyricsContainer>
              <ShowIyrics>
                넌 역시 Trouble! Trouble! Trouble! 때를 노렸어 너는 Shoot!
                Shoot! Shoot! 나는 훗! 훗! 훗!
              </ShowIyrics>
              <SecretIyrics>
                {secretSong.map(index => (
                  <SecretWords key={index}>{index}</SecretWords>
                ))}
              </SecretIyrics>
              <ShowIyrics>
                넌 역시 Trouble! Trouble! Trouble! 때를 노렸어 너는 Shoot!
                Shoot! Shoot! 나는 훗! 훗! 훗!
              </ShowIyrics>
            </IyricsContainer>
          </>
        ) : (
          <RowContainer>
            <MusicPlay />
          </RowContainer>
        )}
      </Container>
      <InputContainer>
        <Input onChange={e => onChange(e.target.value)} />
        <Button type="primary" onClick={checkAnswer}>
          submit
        </Button>
      </InputContainer>
    </>
  );
}

export default PlayPage;
