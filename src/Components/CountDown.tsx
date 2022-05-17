import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

interface Props{
    time:number;
    bottom ?: number;
    position?:string;
}
interface ContainerProps{
    bottom ?: number;
    position?:string;
}
const Container = styled.div<ContainerProps>`
    position: ${(prop)=> prop.position}; 
    bottom: ${(prop)=> prop.bottom}px;
    display: flex;
    color: #FFF2F2;
    font-family: 'nice';
    font-style: normal;
    font-size: 20px;
    -webkit-text-stroke-color: #ff5f5f;
    -webkit-text-stroke-width: 1px;
`
export default function CountDown({time,bottom,position} :Props) {
    const [second,setSecond] = useState<number>(time);
    
    useEffect(()=>{
        const countdown = setInterval(()=>{
            if(second > 0){
                setSecond(sec => sec-1);
            }
        },1000);
        return () => clearInterval(countdown);
    },[second])
  return (
    <Container bottom={bottom} position={position}>{second}</Container>
  )
}
