import { Button } from "antd";
import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`;
function Login() {
    return (
        <Container>
            <button><img src="./Assets/kakao_login_medium_narrow.png"></img></button>
        </Container>
    );
}


export default Login;