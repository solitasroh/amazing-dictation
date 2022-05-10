import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import buttonImage from '../Assets/kakao_login_medium_narrow.png';
import googleImage from '../Assets/btn_google_signin_dark_normal_web.png';
import LoginButton from '../Components/Login/LoginButton';
import LogoImg from '../Assets/Logo.png';

const MainContainer = styled.div`
  position: absolute;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  align-content: flex-end;
  align-items: flex-end;
  user-select: none;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  margin: 20px;
`;
const LogoContainer = styled.div`
  position: relative;
`;
const Logo = styled.img`
  width: fit-content;
  height: fit-content;
  margin: 20px;
`;

function Login() {
  const navigate = useNavigate();

  const onClick = (): void => {
    console.log('button click!');
    navigate(`/Game/Init`);
  };

  return (
    <MainContainer>
      <LogoContainer>
        <Logo src={LogoImg} />
      </LogoContainer>
      <ButtonContainer>
        <LoginButton onClick={onClick} image={buttonImage} />
        <LoginButton onClick={onClick} image={googleImage} />
      </ButtonContainer>
    </MainContainer>
  );
}

export default Login;
