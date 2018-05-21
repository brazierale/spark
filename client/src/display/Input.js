import React, { Component } from 'react';
import { Row } from './Row';
import './Display.css';

export class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            entryType: 'Empty',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    render() { 
        return (
            <div>
                <div>
                    <Row>
                        <input 
                            type="text"
                            placeholder="Enter your test case here..."
                            className={this.state.entryType}
                            value={this.state.userInput}
                            onChange={this.handleUserInput}
                            onKeyPress={this.handleKeyPress}
                        />
                    </Row>
                </div>
            </ div>
        )
    }

    // update entry field type based on first character(s)
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case-header';

        v === '' ? t = 'Empty' : t = 'Test-case';

        this.setState({ entryType: t, userInput: v})
    }

    // when the user presses Enter, create the item and clear the input field
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            var toSend = JSON.stringify({summary: this.state.userInput});

            (async () => {
                const response = await fetch('/api/testCases', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: toSend
                })

            })();

            this.setState({ entryType: 'Empty', userInput: ''});
        }
    }
}