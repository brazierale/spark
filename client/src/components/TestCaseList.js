import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from '../connected-components/Row';

import { TestCasePropTypes } from '../modules/TestCase';
import '../styles/TestCaseList.css'

class TestCaseList extends Component {
    render() {
        return(
            <div>
                {this.testCasesToRender(this.props.testCases)}
            </div>
        );
    }

    testCasesToRender = testCases => {
        testCases.sort((a, b) => this.sortBySortId(a, b));
    
        return (
            testCases.map((testCase) => 
                <Row key={testCase.key}
                    testCase={testCase}
                    nextSortId={this.props.nextSortId}
                    moveAboveSortId={key => this.moveAboveSortId(key)}
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
    
    moveAboveSortId = key => {
        // get the numbers either side of the new position and pick a sortId between them
        // could still use with improving as it takes < 20 switches to end up with duplicate sortIds
        let thisIndex = this.props.testCases.findIndex( tc => {return tc.key === key});
        let toMoveAbove = this.props.testCases[thisIndex];
        let toMoveBelow = this.props.testCases[thisIndex-1];
        console.log(toMoveAbove)
        console.log(toMoveBelow)
        if (!toMoveBelow) {toMoveBelow = {sortId: 0}}
        
        return Math.floor(( toMoveAbove.sortId + toMoveBelow.sortId) / 2 );
    }
}


TestCaseList.propTypes = {
    testCases: PropTypes.arrayOf(TestCasePropTypes).isRequired,

    nextSortId: PropTypes.func.isRequired
}

export default TestCaseList;