import React, { Component } from 'react';
import './Components.css';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            entryType: 'Test-case-header',
            currentDepth: 0,
            lastTestCase: 1,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    render() { 
        return (
            <div>
                <input 
                    type="text"
                    className={this.state.entryType}
                    value={this.state.userInput}
                    onChange={this.handleUserInput}
                    onKeyPress={this.handleKeyPress}
                />
                <h3>User input: <span>{this.state.userInput}</span></h3>
                <h3>Current entry type: <span>{this.state.entryType}</span></h3>
                <h3>Current depth: <span>{this.state.currentDepth}</span></h3>
                <h3>Most recent test case id: <span>{this.state.lastTestCase}</span></h3>
            </div>
        )
    }

    // update entry field type based on first character(s)
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case-header';
        let firstChar = v.charAt(0);

        if ( firstChar === '/' && v.charAt(1) === '/' ) {
            t = 'Comment';
        }
        else if ( firstChar === '#') {
            t = 'Tag';
        }
        else if ( firstChar === '-' || firstChar === '*') {
            t = 'Test-case';
        }
        else {
            t= 'Test-case-header'
        }

        this.setState({ entryType: t, userInput: v})
    }

    // when the user presses Enter, create the item and clear the input field
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            let newDepth = this.state.currentDepth;
            let newTestCase = this.state.lastTestCase;

            if (this.state.type === 'Test-case-header') {
                newDepth++;
            }
            if (this.state.type === 'Test-case') {
                newTestCase++;
            }      

            this.props.addComponent(this.state.userInput, this.state.entryType, this.state.currentDepth, this.state.lastTestCase);
            this.setState({ entryType: 'Test-case-header', userInput: '', currentDepth: newDepth, lastTestCase: newTestCase});
        }
    }
}