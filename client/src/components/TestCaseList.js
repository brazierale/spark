import React, { Component } from 'react';

import Row from '../connected-components/Row';
import '../support/TestCaseList.css'

export class TestCaseList extends Component {
        
    render() {
        const testCasesToRender = this.props.testCases.map((testCase) => 
            <Row key={testCase.key}
                testCaseKey={testCase.key}
                testCaseSummary={testCase.summary}
            >
            </Row>
        );

        return(
                <div>{testCasesToRender}</div>
        );
    }
}

