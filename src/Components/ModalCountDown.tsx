import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import CountDown from './CountDown'

interface Prop{
    time : number;
    isVisible:boolean;
    onEnd : ()=>void;
}
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${(props) =>props.visible ? fadeIn : fadeOut} 0.15s ease-out;
`;

const TransparentContainer = styled.div<{ visible: boolean }>`
  display: flex;
  position: absolute;
  left: 50%;
  top:30%;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: ${(props) =>props.visible ? fadeIn : fadeOut} 0.15s ease-out;
`;

export default function ModalCountDown({time,isVisible,onEnd} :Prop) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      if (isVisible) {
        setIsModalVisible(true);
      } else {
        setTimeout(() => setIsModalVisible(false), 150);
      }
    }, [isVisible]);

    if (!isModalVisible) {
      return null;
    }
    
  return (
    <><Background visible={isModalVisible} />
    <TransparentContainer visible={isModalVisible}>
      <CountDown time={time} onComplete={onEnd} size ={30} />
    </TransparentContainer></>
    
  )
}
