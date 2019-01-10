import React, { Component } from 'react';

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
        this.props.deleteTestCaseById(this.props.testCaseId)
    }
}