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
import DeleteTestCase from  '../components/DeleteTestCase';
import MoveTestCase from '../components/MoveTestCase';

class Row extends Component {
    constructor(props) {
        super(props);

        this.updateSelectedTestCaseSummary = this.updateSelectedTestCaseSummary.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    render() {
        let classes = classNames({
                'Row': true,
                'Selected-row': this.isSelected(),
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
                        isSelected={this.isSelected()}
                    />
                </div>
                <MoveTestCase
                    testCaseKey={this.props.testCase.key}
                    disabled={this.props.testCase.saving}
                />
                <DeleteTestCase 
                    testCaseKey={this.props.testCase.key}
                    deleteTestCase={key => this.deleteTestCase(key)}
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
    deleteTestCase() {
        if (this.isSelected()) {
            this.props.setSelectedTestCaseByKey(0);
        }
        this.props.deleteTestCaseByKey(this.props.testCase.key);
    };
    isSelected() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Row);