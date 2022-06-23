import React from 'react';
import {ApolloProvider} from "@apollo/client";
import MainRouter from './Routes/MainRouter';
import GlobalStyle from './styles/global-styles';
import {client} from "./api-client";

function App() {
  return (
    <>
      <GlobalStyle />
        <ApolloProvider client={client}>
          <div className="App">
            <MainRouter />
          </div>
        </ApolloProvider>
    </>
  );
}

export default App;
