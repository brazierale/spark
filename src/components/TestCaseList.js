import React, { Component } from 'react';
import { TestCaseEntry } from './TestCaseEntry';
import { TestCaseListItem } from './TestCaseListItem';
import './TestCase.css';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineItems: []
        };

        this.addTestCase = this.addTestCase.bind(this);
    }
    render() {
        return (
            <div>
                {this.state.lineItems}
                <TestCaseEntry addTestCase={this.addTestCase}/>
            </div>
        )
    }

    addTestCase(testCase, type) {
        var newArray = this.state.lineItems.slice();

        newArray.push(
            <TestCaseListItem text={testCase} type={type} />
        );

        this.setState({ lineItems: newArray });
    }
}