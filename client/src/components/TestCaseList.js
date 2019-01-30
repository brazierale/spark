import React from 'react';
import PropTypes from 'prop-types';

import Row from '../connected-components/Row';

import { TestCaseObject } from '../modules/TestCase';
import '../styles/TestCaseList.css'

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

TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCaseObject).isRequired
}

export default TestCaseList;