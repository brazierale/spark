import React, { Component } from 'react';

export class DeleteTestCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.testCaseId,
        }
        
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
        console.log(`Trying to delete row ${this.state.id}`);

        (async () => {
            const response = await fetch(`/api/testCases/${this.state.id}`, {
                method: 'DELETE'
                }
            )
            await this.props.rebuildList();
        })();
    }
}