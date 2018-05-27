import React, { Component } from 'react';

export class DeleteRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.rowid,
        }
        
        this.deleteRow = this.deleteRow.bind(this);
    }

    render() {
        return (
            <div className="Delete-row"
                type="text"
                onClick={this.deleteRow}
            >
            x
            </div>
        );
    }

    deleteRow() {
        console.log(`Trying to delete row ${this.state.id}`);

        (async () => {
            const response = await fetch(`/api/testCases/${this.state.id}`, {
                method: 'DELETE'
                }
            )

        })();
        // should only do this only if the row is actually deleted
        this.props.rebuildList();
    }
}