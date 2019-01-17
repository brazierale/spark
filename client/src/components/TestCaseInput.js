import React, { Component } from 'react';
import classNames from 'classnames';

import { TestCase } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';

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
        this.sendUpdate = this.sendUpdate.bind(this);
    }

    render() {
        let classes = classNames(
            this.state.entryType,
            {
                'Test-case-input': true,
                'Selected-input': this.props.isSelected
            }
        )
        return (
            <input
            ref={(input) => { this.nameInput = input; }}
            type="text"
            maxLength="255"
            placeholder="Enter your test case here..."
            className={classes}
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
        this.props.updateSelectedTestCaseSummary(e.target.value);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendUpdate(e.target.value);
        }
    }

    handleFocus() {
        if (this.props.selectedTestCase.key !== this.props.testCaseKey) {
            this.props.setSelectedTestCaseByKey(this.props.testCaseKey);
        }
    }
    
    sendUpdate(summary) {
        // create new test case if this is the entryRow
        if(this.props.testCaseKey === 0 && summary !== '') {
            const newTestCase = this.props.selectedTestCase;
            newTestCase.key = generateKey();
            
            this.props.addTestCase(newTestCase);

            this.setState({ summary: '' });
            this.props.setSelectedTestCaseByKey(0);
        }
        // delete the test case if it is empty
        else if (summary === '' && this.props.testCaseKey !== 0) {
            this.props.setSelectedTestCaseByKey(0);
            this.props.deleteTestCaseByKey(this.props.testCaseKey);
        }
        else if (this.props.testCaseKey !==0) {
            const updatedTestCase = new TestCase(this.props.testCaseKey, summary, this.props.testCaseTags);
            this.props.updateTestCase(updatedTestCase);
        }
    }
}