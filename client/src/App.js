import React, { Component } from 'react';
import MainContainer from './connected-components/MainContainer';
import logo from './support/small-header.svg';
import './support/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainContainer />
        </div>
    );
  }
}

function Header(props) {
  return (
    <div className="Header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
  );
}

export default App;
