import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

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

class Row extends Component {

    render() {
        let classes = classNames({
                'Row': true,
                'Selected-row': this.isSelected(),
                'Test-case-disabled': this.props.testCase.disabled
        })
        return (
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

    nextSortId: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);