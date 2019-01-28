import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// x button to delete a test case
export class DeleteTestCase extends Component {
    constructor(props) {
        super(props);
        
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    render() {
        if (this.props.testCaseKey !== 0 && this.props.disabled !== true) {
            return (
                <FontAwesomeIcon
                    className="Delete-row"
                    icon={faTimes}
                    onClick={this.deleteTestCase}
                />
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