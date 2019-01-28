import React, { Component } from 'react';
import classNames from 'classnames';

import { TestCase } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';

export class TestCaseInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: props.testCase.summary,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
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

    handleUserInput(e) {
        this.setState({ summary: e.target.value})
        this.props.updateSelectedTestCaseSummary(e.target.value);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' || e.keyCode === 9) {
            e.preventDefault();
            this.sendUpdate(this.state.summary);
        }
    }

    handleFocus() {
        if (this.props.selectedTestCase.key !== this.props.testCase.key) {
            this.props.setSelectedTestCaseByKey(this.props.testCase.key);
        }
    }
    
    sendUpdate(summary) {
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
            let updatedTestCase = new TestCase(
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