import React, { Component } from 'react';

// x button to delete a test case
export class DeleteTestCase extends Component {
    constructor(props) {
        super(props);
        
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    render() {
        if (this.props.testCaseKey !== 0 && this.props.disabled !== true) {
            return (
                <div className="Delete-row"
                    type="text"
                    onClick={this.deleteTestCase}
                >
                x
                </div>
            );
        }
        else {
            return null;
        }
    }

    deleteTestCase() {
        // if the currently selected test case is being deleted, set the selected test case to entry row
        if(this.props.isSelected) {
            this.props.setSelectedTestCaseByKey(0);
        }
        this.props.deleteTestCaseByKey(this.props.testCaseKey);
    }
}