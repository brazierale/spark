import React, { Component } from 'react';
import { TestCaseEntry } from './components/TestCaseEntry';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is the Spark</h1>
        </header>
        <p className="App-intro">
          To get started, enter your first test case below
        </p>
        <TestCaseEntry />
      </div>
    );
  }
}

export default App;
