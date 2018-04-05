import React, { Component } from 'react';
import { TestCaseEntry } from './TestCaseEntry';
import { TestCaseListItem } from './TestCaseListItem';
import './TestCase.css';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testCases: []
        };

        this.addTestCase = this.addTestCase.bind(this);
    }
    render() {
        return (
            <div>
                {this.state.testCases}
                <TestCaseEntry addTestCase={this.addTestCase}/>
            </div>
        )
    }

    addTestCase(testCase, type) {
        var newArray = this.state.testCases.slice();

        newArray.push(
            <TestCaseListItem text={testCase} type={type} />
        );

        this.setState({ testCases: newArray });
    }
}