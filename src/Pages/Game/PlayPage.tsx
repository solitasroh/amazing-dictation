import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import MusicPlay from '../../Components/MusicPlay';
import CountDown from '../../Components/CountDown';
import SongInfo from '../../Components/SongInfo';

interface Props {
  id: number;
}
interface SongProps{
  singer : string;
  title : string;
  lyrics : string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
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
  background: rgba(135, 135, 135, 0.86);
  box-shadow: 2px 5px 1px 1px rgba(141, 115, 22, 0.94);  
  border-radius: 10px;
`;
const RowContainer = styled.div`
  display: flex;
`;
const LyricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
`;
const ShowLyrics = styled.div`
  font-weight: 200;
  font-size: 20px;
  line-height: 50px;
  color: #ffffff;  
  font-family: 'cookie_reg';
`;
const SecretLyrics = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'cookie_reg';
`;
const SecretWords = styled.div`
  display: flex;
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffe600;
  background-color: white;
  border-radius: 5px;
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
  animation: ${CounterAnimation} 10 1s;
`;

const InputContainer = styled.div`
  display: flex;
`;
function PlayPage({ id }: Props): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const songInfo = location?.state as SongProps;
  const inputValue = useRef<string>('');
  const secretSong = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [ 11, 12, 13, 14, 15, 16, 17, 18, 19,20]
  ];
  const songId = new Array<number>();
  const [lyricsShowing, setLyricsShowing] = useState(true);
  const onChange = (value: string) => {
    inputValue.current = value;
  };

  const checkAnswer = (): void => {
    const answer = songInfo.lyrics === inputValue.current;
    navigate(`/Game/Result`, { state: { answer, songInfo} });
  };

  useEffect(()=>{
    for(let i =0; i<secretSong.length; i+=1)
    {
      songId.push(i);
    }
  },[]);
  return (
    <>
      <Container>
        <TransparentContainer>
          {lyricsShowing ? (
            <>
              <CounterContainer>                
                <CountDown time={1000} onComplete={checkAnswer} />
              </CounterContainer>              
              <SongInfo title={songInfo?.title} singer={songInfo?.singer}/>
              <LyricsContainer>
                <ShowLyrics>
                  넌 역시 Trouble! Trouble! Trouble! 때를 노렸어 너는 Shoot!
                  Shoot! Shoot! 나는 훗! 훗! 훗!
                </ShowLyrics>
                <SecretLyrics>
                  {secretSong.map((value,index) =>(<RowContainer key={songId[index]}>{
                    value.map(value1 => <SecretWords key={value1}>{value1}</SecretWords>)}</RowContainer>
                  ))}
                </SecretLyrics>
                <ShowLyrics>
                  넌 역시 Trouble! Trouble! Trouble! 때를 노렸어 너는 Shoot!
                  Shoot! Shoot! 나는 훗! 훗! 훗!
                </ShowLyrics>
              </LyricsContainer>
            </>
          ) : (
            <RowContainer>
              <MusicPlay />
            </RowContainer>
          )}
        </TransparentContainer>
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
