import React, { Component } from 'react';
import { setSelectedTestCaseById } from '../actions/testcase-actions';

// x button to delete a test case
export class DeleteTestCase extends Component {
    constructor(props) {
        super(props);
        
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    render() {
        return (
            <div className="Delete-row"
                type="text"
                onClick={this.deleteTestCase}
            >
            x
            </div>
        );
    }

    deleteTestCase() {
        // if the currently selected test case is being deleted, set the selected test case to entry row
        if(this.props.isSelected) {
            this.props.setSelectedTestCaseById(0);
        }
        this.props.deleteTestCaseById(this.props.testCaseId);
    }
}