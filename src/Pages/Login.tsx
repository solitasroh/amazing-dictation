import React from "react";
import styled from 'styled-components';

import buttonImage from '../Assets/kakao_login_medium_narrow.png';
import LoginButton from "../Components/Login/LoginButton";

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
`;
function Login() {
    const onClick = () : void => {
        console.log("button click!");
    };
    return (
        <Container>
            <LoginButton onClick={onClick} image = {buttonImage}></LoginButton>
        </Container>
    );
}


export default Login;