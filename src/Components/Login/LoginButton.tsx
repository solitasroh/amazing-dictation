import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  image?: string;
}
const Container = styled.div`
  display: flex;
`;

const ButtonContainer = styled.button<Props>`
  border: transparent 0;
  background: transparent;
  outline: none;
  cursor: pointer;
`;
export default function LoginButton({
  onClick,
  image,
}: Props): React.ReactElement {
  return (
    <Container>
      <ButtonContainer onClick={onClick}>
        <img alt="test" src={image} />
      </ButtonContainer>
    </Container>
  );
}
