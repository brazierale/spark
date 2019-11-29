import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { TestCaseObject, TestCasePropTypes } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';

class TestCaseInput extends Component {

    render() {
        let classes = classNames({
                'Test-case': true,
                'Test-case-input': true,
                'Selected-input': this.props.isSelected,
                'Test-case-disabled': this.props.testCase.disabled
        })

        // this ensures the field remains editable and is not overwritten by the saved state
        let summary = this.props.testCase.summary;
        if (this.props.isSelected) {
            summary = this.props.selectedTestCase.summary;
        }

        return (
            <input
                ref={(input) => { this.nameInput = input; }}
                type="text"
                maxLength="255"
                placeholder="Enter your test case here..."
                className={classes}
                value={summary}
                onChange={this.handleUserInput}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleOnBlur}
                disabled={this.props.testCase.disabled}
            />
        )
    }

    handleUserInput = event => {
        this.props.updateSelectedTestCaseSummary(event.target.value);
    }

    handleKeyDown = event => {
        if (event.key === 'Enter' || event.keyCode === 9) {
            event.preventDefault();
            this.sendUpdate(event.target.value);
        }
    }
    
    handleFocus = () => {
        if (this.props.selectedTestCase.key !== this.props.testCase.key) {
            this.props.setSelectedTestCaseByKey(this.props.testCase.key);
        }
    }
    
    /* this is annoying as when trying to edit the details the test case saves
    handleOnBlur = () => {
        
        // don't send update if this testcase is new as the user is likely to be using the detail pane
        if (this.props.testCase.key !== 0) {
            this.sendUpdate(this.props.selectedTestCase.summary);
        }
    }
    */

    sendUpdate = summary => {
        // create new test case if this is the entryRow
        if(this.props.testCase.key === 0 && summary !== '') {
            let newTestCase = this.props.testCase;
            newTestCase.key = generateKey();
            newTestCase.sortId = this.props.nextSortId();
            newTestCase.summary = summary;

            this.props.addTestCase(newTestCase);

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
                this.props.testCase.sortId,
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
    testCase: TestCasePropTypes,
    selectedTestCase: TestCasePropTypes.isRequired,
    
    isSelected: PropTypes.bool.isRequired,
    
    addTestCase: PropTypes.func.isRequired,
    deleteTestCaseByKey: PropTypes.func.isRequired,
    setSelectedTestCaseByKey: PropTypes.func.isRequired,
    updateSelectedTestCaseSummary: PropTypes.func.isRequired,
    updateTestCase: PropTypes.func.isRequired,
    nextSortId: PropTypes.func.isRequired
}

export default TestCaseInput;