import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ItemTypes } from '../modules/Constants.js';
import { DragSource } from 'react-dnd';

import TestCaseInput from '../components/TestCaseInput'
import DeleteTestCase from  '../components/DeleteTestCase';
import MoveTestCase from '../components/MoveTestCase';

import { TestCasePropTypes } from '../modules/TestCase';
import { 
    addTestCase,
    deleteTestCaseByKey,
    updateTestCase,
    setSelectedTestCaseByKey,
    updateSelectedTestCase
} from '../actions/testcase-actions';

const testCaseSource = {
    beginDrag(props) {
        return {testCaseId: props.testCase.key}
    }
}

class Row extends Component {

    render() {
        let classes = classNames({
                'Row': true,
                'Selected-row': this.isSelected(),
                'Test-case-disabled': this.props.testCase.disabled
        })

        const { isDragging, connectDragSource } = this.props

        return connectDragSource(
            <div className={classes}>
                <div className="Test-case-container">
                    <TestCaseInput
                        testCase={this.props.testCase}
                        addTestCase={testCase => this.props.addTestCase(testCase)}
                        deleteTestCaseByKey={key => this.props.deleteTestCaseByKey(key)}
                        updateTestCase={testCase => this.props.updateTestCase(testCase)}
                        setSelectedTestCaseByKey={key => this.props.setSelectedTestCaseByKey(key)}
                        updateSelectedTestCaseSummary={summary => this.updateSelectedTestCaseSummary(summary)}
                        selectedTestCase={this.props.selectedTestCase}
                        isSelected={this.isSelected()}
                        nextSortId={this.props.nextSortId}
                    />
                </div>
                <MoveTestCase
                    testCaseKey={this.props.testCase.key}
                    disabled={this.props.testCase.disabled}
                    moveTestCaseUp={this.moveTestCaseUp}
                />
                <DeleteTestCase 
                    testCaseKey={this.props.testCase.key}
                    deleteTestCase={this.deleteTestCase}
                    disabled={this.props.testCase.disabled}
                />
            </div>
        )
    }
    updateSelectedTestCaseSummary = summary => {
        let updatedTestCase = this.props.selectedTestCase;
        updatedTestCase.summary = summary;
        this.props.updateSelectedTestCase(updatedTestCase);
    };
    deleteTestCase = () => {
        if (this.isSelected()) {
            this.props.setSelectedTestCaseByKey(0);
        }
        this.props.deleteTestCaseByKey(this.props.testCase.key);
    };
    isSelected = () => {
        return this.props.testCase.key === this.props.selectedTestCase.key
    };
    moveTestCaseUp = () => {
        let updatedTestCase = this.props.testCase;
        updatedTestCase.sortId = this.props.moveUpSortId(this.props.testCase.key);
        this.props.updateTestCase(updatedTestCase);
    }
}

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const mapStateToProps = state => {    
    return {
        selectedTestCase: state.selectedTestCase,
    }
};

const mapDispatchToProps = {
    addTestCase: addTestCase,
    deleteTestCaseByKey: deleteTestCaseByKey,
    updateTestCase: updateTestCase,
    setSelectedTestCaseByKey: setSelectedTestCaseByKey,
    updateSelectedTestCase: updateSelectedTestCase
};

Row.propTypes = {
    testCase: TestCasePropTypes,

    moveUpSortId: PropTypes.func.isRequired,
    nextSortId: PropTypes.func.isRequired
}

const enhance = compose(
    DragSource(ItemTypes.TEST_CASE, testCaseSource, collect),
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Row);