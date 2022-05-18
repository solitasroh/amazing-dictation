import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SongProps{
  singer : string;
  title : string;
  lyrics : string;
}

const ButtonBox = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
  font-family: 'vitro_core';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 40px;
  background: #92c6bc;
  border: 1.5px solid #296868;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-color: #296868;
  -webkit-text-stroke-width: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default function ReplayBtn( songInfo:SongProps) {
    const navigate = useNavigate();

    const onClick = (): void => {
      navigate(`/Game/Play`, {state : songInfo});
    };
    return (
        <ButtonBox onClick={onClick}>Replay</ButtonBox>
    )
}
