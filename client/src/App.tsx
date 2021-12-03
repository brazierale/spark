import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MainContainer from './connected-components/MainContainer';
import './styles/App.css';

const logo = require ('./styles/small-header.svg');

const App = () => {
  return (
    <div className="App">
      <DragDropContextProvider backend={HTML5Backend}>
        <Header />
        <MainContainer />
      </DragDropContextProvider>
    </div>
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
