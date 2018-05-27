import React, { Component } from 'react';

export class TestCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: props.summary,
            entryType: 'Test-case',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    render() {
        return (
            <input 
                type="text"
                placeholder="Enter your test case here..."
                className={this.state.entryType}
                value={this.state.summary}
                onChange={this.handleUserInput}
                onKeyPress={this.handleKeyPress}
            />
        )
    }
    // update entry field type based on first character(s)
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case-header';

        v === '' ? t = 'Empty' : t = 'Test-case';

        this.setState({ entryType: t, summary: v})
    }

    // when the user presses Enter, updates the test case, or deletes it if it is empty
    handleKeyPress(e) {
        if (e.key === 'Enter') {

            if(e.target.value === '') {
                (async () => {
                    const response = await fetch(`/api/testCases/${this.props.testCaseId}`, {
                        method: 'DELETE'
                        }
                    )
        
                })();
            }
            else {
                var toSend = JSON.stringify({summary: this.state.summary});

                (async () => {
                    const response = await fetch(`/api/testCases/${this.props.testCaseId}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: toSend
                    })

                })();
            }

            // should only run once previous request is successful
            this.props.rebuildList();
        }
    }
}