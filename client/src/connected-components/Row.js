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
import { TestCase } from '../modules/TestCase';

class Row extends Component {
    constructor(props) {
        super(props);

        this.onUpdateSelectedTestCaseSummary = this.onUpdateSelectedTestCaseSummary.bind(this);
    }

    render() {
        let isSelected = false;
        if (this.props.testCaseKey === this.props.selectedTestCase.key) { isSelected = true }
        let classes = classNames(
            'Row',
            {
                'Selected-row': isSelected
            }
        )
        return (
            <div className={classes}>
                <div className="Test-case-container">
                    <TestCaseInput
                        testCaseKey={this.props.testCaseKey}
                        testCaseSummary={this.props.testCaseSummary}
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
                        testCaseKey={this.props.testCaseKey}
                        isSelected={isSelected}
                        setSelectedTestCaseByKey={key => this.props.onSetSelectedTestCaseByKey(key)}
                        deleteTestCaseByKey={key => this.props.onDeleteTestCaseByKey(key)}
                    />
            </div>
        )
    }
    onUpdateSelectedTestCaseSummary(summary) {
        let updatedTestCase = new TestCase(this.props.selectedTestCase.key, summary, this.props.selectedTestCase.tags)
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