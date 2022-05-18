import React from 'react'
import styled from 'styled-components';
import NoteLogo from '../Assets/ping.png'

interface SongProps{
    singer : string;
    title : string;
  }
const Logo = styled.img`
  width: 20px;
  height: 40px;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;  
  width: 90%;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 130px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 4px;
  transform: skew(-20deg);
`;
const TextBox = styled.div`
  display: flex;
  position: absolute;
  font-family: 'cookie_bold';
  font-style: normal;
  transform: skew(20deg);
`;
const SingerContainer = styled.div`
display: flex;
width: 100px;
height: 20px;
align-items: center;
justify-content: center;
background-color: #ffc400;
border-radius: 4px;
transform: skew(-20deg);
`;
export default function SongInfo({title, singer} : SongProps) {
  return (
    <LogoContainer>
        <Logo src={NoteLogo} />
        <TitleContainer><TextBox>{title}</TextBox></TitleContainer>
        <SingerContainer><TextBox>{singer}</TextBox></SingerContainer>
    </LogoContainer>
  )
}
