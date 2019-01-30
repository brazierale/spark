import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from '../connected-components/Row';

import { TestCasePropTypes } from '../modules/TestCase';
import '../styles/TestCaseList.css'

class TestCaseList extends Component {
    render() {
        return(
            <div>{this.testCasesToRender(this.props.testCases)}</div>
        );
    }

    testCasesToRender = testCases => {
        testCases.sort((a, b) => this.sortBySortId(a, b));
    
        return (
            testCases.map((testCase) => 
                <Row key={testCase.key}
                    testCase={testCase}
                    nextSortId={this.props.nextSortId}
                    moveUpSortId={key => this.moveUpSortId(key)}
                >
                </Row>
            )
        );
    }
    
    sortBySortId = (a, b) => {
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
    
    moveUpSortId = key => {
        // okay start, but need to take ccount of edge cases
        // defaulting to 0 means sorting above sets to negative numbers which stops working when sorting from 2nd to top
        // numbers quickly end up the same, e.g. sorting 2 items above 1000 in a row sets them both to 999
        // suggestion to check numbers either side of new position then come up with a number based on that
        let thisIndex = this.props.testCases.findIndex( tc => {return tc.key === key});
        
        if (this.props.testCases[thisIndex-1]){
            return this.props.testCases[thisIndex-1].sortId -1;
        }
        else {
            return 0;
        }
    }
}


TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCasePropTypes).isRequired,

    nextSortId: PropTypes.func.isRequired
}

export default TestCaseList;