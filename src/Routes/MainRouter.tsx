import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import InitPage from '../Pages/Game/InitPage';
import LoadingPage from '../Pages/Game/LoadingPage';
import SongIntroPage from '../Pages/Game/SongIntroPage';
import ResultPage from '../Pages/Game/ResultPage';
import PlayPage from '../Pages/Game/PlayPage';
import HintPage from '../Pages/Game/HintPage';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Game/Init" element={<InitPage id={1} />} />
        <Route path="/Game/Loading" element={<LoadingPage id={1} />} />
        <Route path="/Game/SongIntro" element={<SongIntroPage id={1} />} />
        <Route path="/Game/Play" element={<PlayPage id={1} />} />
        <Route path="/Game/Result" element={<ResultPage id={1} />} />
        <Route path="/Game/Hint" element={<HintPage id={1} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
