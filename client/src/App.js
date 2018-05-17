import React, { Component } from 'react';
import { DisplayComponents } from './display/DisplayComponents';
import { TestCaseList } from './testing/TestCaseList';
import { ExpressTest } from './testing/ExpressTest';
import logo from './small-header.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TestCaseList />
        
        <DisplayComponents />
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
        <p className="App-intro">
          To get started, enter your first test case below
        </p>
      </div>
  );
}

export default App;
