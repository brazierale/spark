import React, { Component } from 'react';

export class ExpressTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            submitted: '',
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
                <h1>Content submitted: {this.state.submitted}</h1>
            </div>
        )
    }

    // update entry field type based on first character(s)
    handleUserInput(e) {
        let v = e.target.value;
        this.setState({ userInput: v})
    }

    // when the user presses Enter, create the item and clear the input field
    handleKeyPress(e) {
        if (e.key === 'Enter') { 
            let s = this.state.userInput;
            // run method to save to database
            // TO-DO
            this.setState({ userInput: '', submitted: s });
        }
    }
}