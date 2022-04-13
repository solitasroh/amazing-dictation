import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import buttonImage from '../Assets/kakao_login_medium_narrow.png';
import googleImage from '../Assets/btn_google_signin_dark_normal_web.png';
import LoginButton from '../Components/Login/LoginButton';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

function Login() {
  const navigate = useNavigate();
  
  const onClick = (): void => {
    console.log('button click!');
    navigate(`/Game/Init`);
  };

  return (
    <Container>
      <LoginButton onClick={onClick} image={buttonImage} />
      <LoginButton onClick ={onClick} image ={googleImage} />
    </Container>
  );
}

export default Login;
