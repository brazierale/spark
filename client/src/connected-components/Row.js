import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { 
    addTestCase,
    deleteTestCaseByKey,
    updateTestCase,
    setSelectedTestCaseByKey,
    updateSelectedTestCase
} from '../actions/testcase-actions';
import { TestCaseInput } from '../components/TestCaseInput'
import { DeleteTestCase } from  '../components/DeleteTestCase';
import { MoveTestCase } from '../components/MoveTestCase';

class Row extends Component {
    constructor(props) {
        super(props);

        this.updateSelectedTestCaseSummary = this.updateSelectedTestCaseSummary.bind(this);
    }

    render() {
        let isSelected = false;
        if (this.props.testCase.key === this.props.selectedTestCase.key) { isSelected = true }
        let classes = classNames({
                'Row': true,
                'Selected-row': isSelected,
                'Test-case-saving': this.props.testCase.saving
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
                        isSelected={isSelected}
                    />
                </div>
                <MoveTestCase
                    testCaseKey={this.props.testCase.key}
                    disabled={this.props.testCase.saving}
                />
                <DeleteTestCase 
                    testCaseKey={this.props.testCase.key}
                    isSelected={isSelected}
                    setSelectedTestCaseByKey={key => this.props.setSelectedTestCaseByKey(key)}
                    deleteTestCaseByKey={key => this.props.deleteTestCaseByKey(key)}
                    disabled={this.props.testCase.saving}
                />
            </div>
        )
    }
    updateSelectedTestCaseSummary(summary) {
        let updatedTestCase = this.props.selectedTestCase;
        updatedTestCase.summary = summary;
        this.props.updateSelectedTestCase(updatedTestCase);
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

export default connect(mapStateToProps, mapDispatchToProps)(Row);