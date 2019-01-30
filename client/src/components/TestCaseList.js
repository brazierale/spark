import React from 'react';
import PropTypes from 'prop-types';

import Row from '../connected-components/Row';

import { TestCasePropTypes } from '../modules/TestCase';
import '../styles/TestCaseList.css'

const TestCaseList = props => {
    return(
        <div>{testCasesToRender(props, props.testCases)}</div>
    );
}

const testCasesToRender = (props, testCases) => {
    return (
        testCases.map((testCase) => 
            <Row key={testCase.key}
                testCase={testCase}
                nextSortId={props.nextSortId}
            >
            </Row>
        )
    );
}

TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCasePropTypes).isRequired,

    nextSortId: PropTypes.func.isRequired
}

export default TestCaseList;