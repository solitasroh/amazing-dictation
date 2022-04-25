import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface sizeProps {
  size: number;
}
interface Props {
  id: number;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: center;
  align-items: center;
`;
const PlayBox = styled.div<sizeProps>`
  display: flex;
  width: 10px;
  margin-left: 2px;
  height: ${props => props.size}px;
  background-color: white;
  transition: 1s ease;
`;
export default function MusicPlay() {
  const [size, setSize] = useState<number[]>([]);
  const checkCount = useRef(0);
  const id = useRef(0);

  const play2 = [
    [100, 10, 100, 10, 100, 10, 100, 10],
    [90, 100, 50, 100, 50, 20, 90, 80],
    [80, 30, 100, 10, 60, 60, 20, 50],
    [70, 25, 50, 30, 40, 50, 70, 30],
    [60, 75, 40, 70, 100, 10, 100, 70],
  ];

  function callback2() {
    setSize(play2[checkCount.current]);
    checkCount.current += 1;
    if (checkCount.current === 5) {
      checkCount.current = 0;
    }
  }

  useEffect(() => {
    const timer = setInterval(callback2, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <PlayBox size={size[0]} />
      <PlayBox size={size[1]} />
      <PlayBox size={size[2]} />
      <PlayBox size={size[3]} />
      <PlayBox size={size[4]} />
      <PlayBox size={size[5]} />
      <PlayBox size={size[6]} />
      <PlayBox size={size[7]} />
    </Container>
  );
}
