import React, { Component } from 'react';
import './TestCase.css';

export class TestCaseEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            entryType: 'Test-case',
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
            </div>
        )
    }

    // update entry field type based on first character(s)
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case';
        let firstChar = v.charAt(0);

        if ( firstChar === '/' && v.charAt(1) === '/' ) {
            t = 'Comment';
        }
        else if ( firstChar === '#') {
            t = 'Tag';
        }
        else if ( firstChar === '-' || firstChar === '*' ) {
            t = 'Sub-test-case';
        }

        this.setState({ entryType: t, userInput: v})
    }

    // when the user presses Enter, create the item and clear the input field
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            //increment last test case created, later this will be the last selected test case
            let t = this.state.lastTestCase + 1;

            this.props.addTestCase(this.state.userInput, this.state.entryType);
            this.setState({ entryType: '', userInput: ''});
        }
    }
}