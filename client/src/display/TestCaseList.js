import React, { Component } from 'react';
import { Row } from './Row';

export class TestCaseList extends Component {
        
    render() {
        let k = 0;
        const testCasesToRender = this.props.testCases.map((testCase) => 
            <Row key={k++}
                testCaseId={testCase.id}
                testCaseSummary={testCase.summary}
                createTestCase={this.props.createTestCase}
                updateTestCase={this.props.updateTestCase}
                deleteTestCase={this.props.deleteTestCase}
                setSelectedTestCase={this.props.setSelectedTestCase}
                selectedTestCaseId={this.props.selectedTestCase.id}>
            </Row>
        );

        return(
                <div>{testCasesToRender}</div>
        );
    }
}