import React, { Component } from 'react';
import { TestCaseInput } from './TestCaseInput'
import { DeleteTestCase } from  './DeleteTestCase';

export class Row extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Row">
                <div className="Test-case-container">
                    <TestCaseInput
                        testCaseId={this.props.testCaseId}
                        testCaseSummary={this.props.testCaseSummary}
                        setSelectedTestCaseById={this.props.setSelectedTestCaseById}
                    />
                </div>
                <DeleteTestCase 
                    testCaseId={this.props.testCaseId}
                />
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Row-id">
                    {this.props.testCaseId}
                </div>
            </div>
        )
    }
}