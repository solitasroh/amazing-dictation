import React from "react";
import { Button } from "antd";
import styled from 'styled-components';

import buttonImage from '../Assets/kakao_login_medium_narrow.png';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`;
function Login() {
    return (
        <Container>
            <button><img alt="test" src={buttonImage}></img></button>
        </Container>
    );
}


export default Login;