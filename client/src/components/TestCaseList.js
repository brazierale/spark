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
    testCases.sort((a, b) => sortBySortId(a, b));

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

const sortBySortId = (a, b) => {
    if (a.sortId < b.sortId) {
        return -1;
    }
    if (a.sortId > b.sortId) {
        return 1;
    }
    else {
        return 0;
    }
}

TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCasePropTypes).isRequired,

    nextSortId: PropTypes.func.isRequired
}

export default TestCaseList;