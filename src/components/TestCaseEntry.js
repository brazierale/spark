import React, { Component } from 'react';
import './TestCaseEntry.css';

export class TestCaseEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            entryType: 'Test-case'
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }
    render() { 
        return (
            <div>
                <input className={this.state.entryType} value={this.state.userInput} onChange={this.handleUserInput} />
                <h1>Type: {this.state.entryType}</h1>
            </div>
        )
    }

    // set the
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case';

        if ( v.charAt(0) === '/' && v.charAt(1) === '/' ) {
            t = 'Comment';
        }
        else if ( v.charAt(0) === '#') {
            t = 'Tag';
        }
        else if ( v.charAt(0) === ':' ) {
            t = 'Sub-test-case';
        }

        this.setState({ entryType: t, userInput: v})
    }
}