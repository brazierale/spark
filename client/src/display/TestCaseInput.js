import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        if (this.props.testCaseId === this.props.selectedTestCaseId) {
            this.nameInput.focus(); 
        }
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
    // update entry field type based on first character(s)
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
        this.props.setSelectedTestCase(this.props.testCaseId);
    }

    handleBlur() {
        this.sendUpdate(this.state.summary);
    }

    sendUpdate(summary) {
        if(this.props.testCaseId === 0 && summary !== '') {
            this.props.createTestCase(this.state.summary);
        }
        else if (summary === '' && this.props.testCaseId !== 0) {
            this.nameInput.blur();
            this.props.deleteTestCase(this.props.testCaseId);
            this.props.setSelectedTestCase(0);
        }
        else if (this.props.testCaseId !==0) {
            this.props.updateTestCase(this.props.testCaseId, this.state.summary);
        }
    }
}

TestCaseInput.propTypes = {
        testCaseId: PropTypes.number.isRequired,
        testCaseSummary: PropTypes.string.isRequired,
        selectedTestCaseId: PropTypes.number.isRequired,

        setSelectedTestCase: PropTypes.func.isRequired,
        createTestCase: PropTypes.func.isRequired,
        updateTestCase: PropTypes.func.isRequired,
        deleteTestCase: PropTypes.func.isRequired,
}