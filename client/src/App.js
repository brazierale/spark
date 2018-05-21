import React, { Component } from 'react';
import { DisplayInput } from './display/DisplayInput';
import { TestCaseList } from './display/TestCaseList';
import logo from './small-header.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TestCaseList />
        
        <DisplayInput />
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
