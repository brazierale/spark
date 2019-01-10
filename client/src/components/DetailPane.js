import React, { Component } from 'react';

// right-hand pane displaying details of selected test case
export class DetailPane extends Component {

    render() {
        if (this.props.selectedTestCase){
            return (
                <div className="Detail-pane">
                    <div className="Detail-pane-header">
                        <h1>{this.props.selectedTestCase.summary}</h1>
                        <p>{this.props.selectedTestCase.id}</p>
                    </div>
                </div>
            )            
        }
        else {
            return null
        }
    }
}