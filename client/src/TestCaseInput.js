import React, { Component } from 'react';
import classNames from 'classnames';
import { TestCase } from './modules/TestCase';

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
        let classes = classNames(
            this.state.entryType,
            {
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
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendUpdate(e.target.value);
        }
    }

    handleFocus() {
        this.props.setSelectedTestCaseById(this.props.testCaseId);
    }

    handleBlur() {
        if(this.props.testCaseId === 0 && this.state.summary !== '') {
            //this.sendUpdate(this.state.summary);
        }
    }
    
    sendUpdate(summary) {
        // create new test case if this is the entryRow
        if(this.props.testCaseId === 0 && summary !== '') {
            const newTestCase = new TestCase(999, summary);
            this.props.addTestCase(newTestCase);
            this.setState({ summary: '' });
        }
        // delete the test case if it is empty
        else if (summary === '' && this.props.testCaseId !== 0) {
            this.nameInput.blur();
            this.props.deleteTestCaseById(this.props.testCaseId);
            this.props.setSelectedTestCaseById(0);
        }
        else if (this.props.testCaseId !==0) {
            const toUpdate = new TestCase(this.props.testCaseId, this.state.summary);
            this.props.updateTestCase(toUpdate);
        }
    }
}