import React, { Component } from 'react';
import { Row } from './Row';

export class TestCaseList extends Component {
        
    componentWillReceiveProps(nextProps) {
        console.log(`Props:`);
        console.log(this.props.testCases);
        console.log(nextProps.testCases);
    }

    render() {
        //console.log(`rendering...`);
        //console.log(this.props.testCases);
        //console.log(this.state.testCasesToRender);
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