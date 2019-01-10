import React, { Component } from 'react';

export class TestCaseInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: props.testCaseSummary,
            entryType: 'Test-case',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ summary: this.props.testCaseSummary });
    }

    componentDidMount() {
        //if (this.props.testCaseId === this.props.selectedTestCaseId) {
        //    this.nameInput.focus(); 
        //}
    }

    render() {
        return (
            <input
                ref={(input) => { this.nameInput = input; }}
                type="text"
                maxLength="255"
                placeholder="Enter your test case here..."
                className={this.state.entryType}
                value={this.state.summary}
                onChange={this.handleUserInput}
                onKeyPress={this.handleKeyPress}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            />
        )
    }
    // update entry field type based on whether its empty or not
    handleUserInput(e) {
        let v = e.target.value;
        let t = 'Test-case-header';

        v === '' ? t = 'Empty' : t = 'Test-case';

        this.setState({ entryType: t, summary: v})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendUpdate(e.target.value);
        }
    }

    handleFocus() {
        console.log(`Focus on ${this.props.testCaseId}`);
        this.props.setSelectedTestCaseById(this.props.testCaseId);
    }

    handleBlur() {
        //this.sendUpdate(this.state.summary);
    }

    sendUpdate(summary) {
        //needs updating
    }
}