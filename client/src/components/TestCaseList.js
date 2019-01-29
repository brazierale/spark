import React from 'react';
import PropTypes from 'prop-types';

import { TestCaseObject } from '../modules/TestCase';
import Row from '../connected-components/Row';
import '../support/TestCaseList.css'

const TestCaseList = props => {
    return(
        <div>{testCasesToRender(props.testCases)}</div>
    );
}

const testCasesToRender = testCases => {
    return (
        testCases.map((testCase) => 
            <Row key={testCase.key}
                testCase={testCase}
            >
            </Row>
        )
    );
}

export default TestCaseList;

TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCaseObject).isRequired
}