import React, { Component } from 'react';

import Row from '../connected-components/Row';
import '../support/TestCaseList.css'

export class TestCaseList extends Component {
        
    render() {
        const testCasesToRender = this.props.testCases.map((testCase) => 
            <Row key={testCase.key}
                testCase={testCase}
            >
            </Row>
        );

        return(
                <div>{testCasesToRender}</div>
        );
    }
}

