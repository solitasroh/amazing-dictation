import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

interface Props{
    time:number;
    bottom ?: number;
    position?:string;
    size ?: number;
    onComplete :()=>void;
}
interface ContainerProps{
    bottom ?: number;
    position?:string;
    size?: number;
}
const Container = styled.div<ContainerProps>`
    position: ${(prop)=> prop.position}; 
    bottom: ${(prop)=> prop.bottom}px;
    display: flex;
    color: #FFF2F2;
    font-family: 'nice';
    font-style: normal;
    font-size: ${(prop)=> prop.size ?? 20}px;
    -webkit-text-stroke-color: #ff5f5f;
    -webkit-text-stroke-width: 1px;
`
export default function CountDown({time,bottom,position,size,onComplete} :Props) {
    const [second,setSecond] = useState<number>(time);
    
    useEffect(()=>{
        const countdown = setInterval(()=>{
            if(second > 0){
                setSecond(sec => sec-1);
            }
        },1000);

        if(second ===0)
            onComplete();
        return () => clearInterval(countdown);
    },[second])

  return (
    <Container bottom={bottom} position={position} size ={size}>{second}</Container>
  )
}