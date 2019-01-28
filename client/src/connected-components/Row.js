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

class Row extends Component {
    constructor(props) {
        super(props);

        this.onUpdateSelectedTestCaseSummary = this.onUpdateSelectedTestCaseSummary.bind(this);
    }

    render() {
        let isSelected = false;
        if (this.props.testCase.key === this.props.selectedTestCase.key) { isSelected = true }
        let classes = classNames(
            'Row',
            {
                'Selected-row': isSelected,
                'Test-case-saving': this.props.testCase.saving
            }
        )
        return (
            <div className={classes}>
                <div className="Test-case-container">
                    <TestCaseInput
                        testCase={this.props.testCase}
                        addTestCase={testCase => this.props.onAddTestCase(testCase)}
                        deleteTestCaseByKey={key => this.props.onDeleteTestCaseByKey(key)}
                        updateTestCase={testCase => this.props.onUpdateTestCase(testCase)}
                        setSelectedTestCaseByKey={key => this.props.onSetSelectedTestCaseByKey(key)}
                        updateSelectedTestCaseSummary={summary => this.onUpdateSelectedTestCaseSummary(summary)}
                        selectedTestCase={this.props.selectedTestCase}
                        isSelected={isSelected}
                    />
                </div>
                    <DeleteTestCase 
                        testCaseKey={this.props.testCase.key}
                        isSelected={isSelected}
                        setSelectedTestCaseByKey={key => this.props.onSetSelectedTestCaseByKey(key)}
                        deleteTestCaseByKey={key => this.props.onDeleteTestCaseByKey(key)}
                    />
            </div>
        )
    }
    onUpdateSelectedTestCaseSummary(summary) {
        let updatedTestCase = this.props.selectedTestCase;
        updatedTestCase.summary = summary;
        this.props.onUpdateSelectedTestCase(updatedTestCase);
    };
}

const mapStateToProps = state => {    
    return {
        selectedTestCase: state.selectedTestCase,
    }
};

const mapDispatchToProps = {
    onAddTestCase: addTestCase,
    onDeleteTestCaseByKey: deleteTestCaseByKey,
    onUpdateTestCase: updateTestCase,
    onSetSelectedTestCaseByKey: setSelectedTestCaseByKey,
    onUpdateSelectedTestCase: updateSelectedTestCase
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);