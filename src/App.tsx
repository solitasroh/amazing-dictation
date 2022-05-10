import React from 'react';
import MainRouter from './Routes/MainRouter';
import GlobalStyle from './styles/global-styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <MainRouter />
      </div>
    </>
  );
}

export default App;
