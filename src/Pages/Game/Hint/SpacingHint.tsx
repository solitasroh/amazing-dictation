import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ReplayBtn from '../../../Components/ReplayBtn';
import SongInfo from '../../../Components/SongInfo';
import IGame from '../../../types/IGame';
import IHint from '../../../types/IHint';

interface Props {
  id: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TransparentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  align-items: center;
  justify-content: space-around;
  background: rgba(135, 135, 135, 0.86);
  box-shadow: 2px 5px 1px 1px rgba(141, 115, 22, 0.94);
  border-radius: 10px;
`;
const LyricsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RowContainer = styled.div`
  display: flex;
`;
const WordsBox = styled.div`
  display: flex;
  font-family: 'cookie_reg';
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin: 2px;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffe600;
  background-color: white;
  border-radius: 5px;
`;
const SecretAnimation = keyframes`
 from {   
  transform: translatex(0);
  opacity: 0;
  width: 0px;
  }
  to { 
    transform: translateX(-10px);
    opacity:1;
  width: 15px;
  }
`;
const SecretWordsBox = styled.div`
  display: flex;
  font-size: 25px;
  margin: 2px;
  width: 15px;
  opacity: 1;
  align-items: center;
  justify-content: center;
  animation: ${SecretAnimation} 1s;
`;
function SpacingHint({ id }: Props): React.ReactElement {
  const location = useLocation();
  const word = location?.state as { Info: IHint; songInfo: IGame };
  const lyrics = word?.Info.Lyrics;
  const countArray = word.Info.key;
  let c = 0;
  const arrayIndex = lyrics.map(value =>
    value.map(data => {
      if (data === ' ') {
        return ' ';
      }
      c += 1;
      return countArray[c - 1];
    }),
  );
  return (
    <Container>
      <TransparentContainer>
        <SongInfo title={word?.Info.title} singer={word?.Info.singer} />
        <LyricsContainer>
          {arrayIndex.map((value, index) => (
            <RowContainer key={countArray[index]}>
              {value.map((value1, ind) =>
                value1 !== ' ' ? (
                  <WordsBox key={arrayIndex[index][ind]}>{value1 + 1}</WordsBox>
                ) : (
                  <SecretWordsBox key={arrayIndex[index][ind]} />
                ),
              )}
            </RowContainer>
          ))}
        </LyricsContainer>
        <ReplayBtn
          id={word.songInfo.id}
          title={word.Info.title}
          singer={word.Info.singer}
          preSectionLyrics={word.songInfo.preSectionLyrics}
          postSectionLyrics={word.songInfo.postSectionLyrics}
          questionLyrics={word.songInfo.questionLyrics}
          preSectionPlayStartTime={word.songInfo.preSectionPlayStartTime}
          preSectionPlayEndTime={word.songInfo.preSectionPlayEndTime}
          questionSectionPlayStartTime={
            word.songInfo.questionSectionPlayStartTime
          }
          questionSectionPlayEndTime={word.songInfo.questionSectionPlayEndTime}
          songYoutubeLinkUrl={word.songInfo.songYoutubeLinkUrl}
          musicFileLinkUrl={word.songInfo.musicFileLinkUrl}
        />
      </TransparentContainer>
    </Container>
  );
}

export default SpacingHint;
