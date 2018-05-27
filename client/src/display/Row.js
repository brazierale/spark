import React, { Component } from 'react';
import { DeleteTestCase } from  './DeleteTestCase';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testCaseId: props.testCaseId,
        };

        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    render() {
        return (
            <div className="Row">
                <div className="Test-case-container">{this.props.children}</div>
                <DeleteTestCase testCaseId={this.state.testCaseId} rebuildList={this.props.rebuildList}/>
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Row-id">
                    {this.state.testCaseId}
                </div>
            </div>
        )
    }

    handleUp(e) {
        console.log('move row up');
    }

    handleDown(e) {
        console.log('move row down');
    }
}

