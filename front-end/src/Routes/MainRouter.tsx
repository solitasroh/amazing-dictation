import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import Login from '../Pages/Login';
import InitPage from '../Pages/Game/InitPage';
import LoadingPage from '../Pages/Game/LoadingPage';
import SongIntroPage from '../Pages/Game/SongIntroPage';
import ResultPage from '../Pages/Game/ResultPage';
import PlayPage from '../Pages/Game/PlayPage';
import HintPage from '../Pages/Game/HintPage';
import InsertSong from '../Pages/Admin/InsertSong';
import SpacingHint from '../Pages/Game/Hint/SpacingHint';
import WordHint from '../Pages/Game/Hint/WordHint';
import OneFifths from '../Pages/Game/Hint/OneFifths';
import InitialConsonant from '../Pages/Game/Hint/InitialConsonant';
import CreateGame from "../Pages/Game/CreateGame";

function MainRouter() {
  const cookie = new Cookies()
  const token  = cookie.get('access_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token === undefined ? <Login/> : <InitPage id={1}/>} />
        <Route path="/Game/Init" element={<InitPage id={1} />} />
        <Route path="/Game/Loading" element={<LoadingPage id={1} />} />
        <Route path="/Game/SongIntro" element={<SongIntroPage id={1} />} />
        <Route path="/Game/Play" element={<PlayPage id={1} />} />
        <Route path="/Game/Result" element={<ResultPage id={1} />} />
        <Route path="/Game/Hint" element={<HintPage id={1} />} />
        <Route path="/Game/Hint/Inital" element={<InitialConsonant id={1} />} />
        <Route path="/Game/Hint/OneFifths" element={<OneFifths id={1} />} />
        <Route path="/Game/Hint/Spacing" element={<SpacingHint id={1} />} />
        <Route path="/Game/Hint/Word" element={<WordHint id={1} />} />
        <Route path="/Admin/InsertSong" element={<InsertSong id={1} />} />
        <Route path="/Game/Create" element={<CreateGame id="1"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
