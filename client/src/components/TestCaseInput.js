import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';

class TestCaseInput extends Component {
    state = {
        summary: this.props.testCase.summary
    }

    render() {
        let classes = classNames({
                'Test-case': true,
                'Test-case-input': true,
                'Selected-input': this.props.isSelected,
                'Test-case-saving': this.props.testCase.saving
        })
        return (
            <input
                ref={(input) => { this.nameInput = input; }}
                type="text"
                maxLength="255"
                placeholder="Enter your test case here..."
                className={classes}
                value={this.state.summary}
                onChange={this.handleUserInput}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                disabled={this.props.testCase.saving}
            />
        )
    }

    handleUserInput = event => {
        this.setState({ summary: event.target.value})
        this.props.updateSelectedTestCaseSummary(event.target.value);
    }

    handleKeyDown = event => {
        if (event.key === 'Enter' || event.keyCode === 9) {
            event.preventDefault();
            this.sendUpdate(this.state.summary);
        }
    }

    handleFocus = () => {
        if (this.props.selectedTestCase.key !== this.props.testCase.key) {
            this.props.setSelectedTestCaseByKey(this.props.testCase.key);
        }
    }
    
    sendUpdate = summary => {
        // create new test case if this is the entryRow
        if(this.props.testCase.key === 0 && summary !== '') {
            let newTestCase = this.props.testCase;
            newTestCase.key = generateKey();

            this.props.addTestCase(newTestCase);

            this.setState({ summary: '' });
            this.props.setSelectedTestCaseByKey(0);
        }
        // delete the test case if it is empty
        else if (summary === '' && this.props.testCase.key !== 0) {
            this.props.setSelectedTestCaseByKey(0);
            this.props.deleteTestCaseByKey(this.props.testCase.key);
        }
        // otherwise, update the test case
        else if (this.props.testCase.key !==0) {
            let updatedTestCase = new TestCaseObject(
                this.props.testCase.key,
                summary,
                this.props.testCase.description,
                this.props.testCase.steps,
                this.props.testCase.tags
            );
            this.props.updateTestCase(updatedTestCase);
        }
    }
}

TestCaseInput.propTypes = {
    testCase: PropTypes.objectOf(TestCaseObject).isRequired,
    selectedTestCase: PropTypes.objectOf(TestCaseObject).isRequired,
    
    isSelected: PropTypes.bool.isRequired,
    
    addTestCase: PropTypes.func.isRequired,
    deleteTestCaseByKey: PropTypes.func.isRequired,
    setSelectedTestCaseByKey: PropTypes.func.isRequired,
    updateSelectedTestCaseSummary: PropTypes.func.isRequired,
    updateTestCase: PropTypes.func.isRequired
}

export default TestCaseInput;