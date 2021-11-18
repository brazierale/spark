import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import MainContainer from './connected-components/MainContainer';
import logo from './styles/small-header.svg';
import './styles/App.css';

const App = () => {
  return (
    <DragDropContextProvider backend={HTML5Backend} className="App">
      <Header />
      <MainContainer />
    </DragDropContextProvider>
  );
};

const Header = () => {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
};

export default App;
