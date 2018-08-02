import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TestCaseInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: props.summary,
            entryType: 'Test-case',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
            if(e.target.value === '') {
                this.props.deleteTestCase(this.props.testCaseId);
            }
            else {
                this.props.updateTestCase(this.props.testCaseId, this.state.summary);
            }
        }
    }

    handleFocus() {
        console.log(`Focus on ${this.props.testCaseId}`);
        this.props.setSelectedTestCase(this.props.testCaseId);
    }

    handleBlur() {
        this.props.setSelectedTestCase(false);
    }
}

TestCaseInput.propTypes = {
        testCaseId: PropTypes.number.isRequired,
        summary: PropTypes.string.isRequired,

        setSelectedTestCase: PropTypes.func.isRequired,
        updateTestCase: PropTypes.func.isRequired,
        deleteTestCase: PropTypes.func.isRequired,
}