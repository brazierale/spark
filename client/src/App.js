import React from 'react';
import MainContainer from './connected-components/MainContainer';
import logo from './styles/small-header.svg';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MainContainer />
      </div>
  );
}

const Header = () => {
  return (
    <div className="Header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
  );
}

export default App;
