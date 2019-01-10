import React, { Component } from 'react';
import { Row } from './Row';

export class TestCaseList extends Component {
        
    render() {
        const testCasesToRender = this.props.testCases.map((testCase) => 
            <Row key={testCase.id}
                testCaseId={testCase.id}
                testCaseSummary={testCase.summary}
                setSelectedTestCaseById={this.props.setSelectedTestCaseById}
            >
            </Row>
        );

        return(
                <div>{testCasesToRender}</div>
        );
    }
}

