import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { 
    addTestCase,
    deleteTestCaseById,
    updateTestCase,
    setSelectedTestCaseById,
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
        if (this.props.testCaseId === this.props.selectedTestCase.id) { isSelected = true }
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
                        testCaseId={this.props.testCaseId}
                        testCaseSummary={this.props.testCaseSummary}
                        addTestCase={testCase => this.props.onAddTestCase(testCase)}
                        deleteTestCaseById={id => this.props.onDeleteTestCaseById(id)}
                        updateTestCase={testCase => this.props.onUpdateTestCase(testCase)}
                        setSelectedTestCaseById={id => this.props.onSetSelectedTestCaseById(id)}
                        updateSelectedTestCaseSummary={summary => this.onUpdateSelectedTestCaseSummary(summary)}
                        isSelected={isSelected}
                    />
                </div>
                <DeleteTestCase 
                    testCaseId={this.props.testCaseId}
                    isSelected={isSelected}
                    setSelectedTestCaseById={id => this.props.onSetSelectedTestCaseById(id)}
                    deleteTestCaseById={id => this.props.onDeleteTestCaseById(id)}
                />
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Row-id">
                </div>
            </div>
        )
    }
    onUpdateSelectedTestCaseSummary(summary) {
        let updatedTestCase = new TestCase(this.props.selectedTestCase.id, summary, this.props.selectedTestCase.tags)
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
    onDeleteTestCaseById: deleteTestCaseById,
    onUpdateTestCase: updateTestCase,
    onSetSelectedTestCaseById: setSelectedTestCaseById,
    onUpdateSelectedTestCase: updateSelectedTestCase
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);