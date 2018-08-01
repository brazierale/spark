import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
                <DeleteTestCase testCaseId={this.state.testCaseId} deleteTestCase={this.props.deleteTestCase}/>
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

    //not implemented - will move row up but need to consider missing ids and parents
    handleUp(e) {
        console.log('move row up');
    }

    //not implemented - will move row down but need to consider missing ids and parents
    handleDown(e) {
        console.log('move row down');
    }
}

Row.propTypes = {
    testCaseId: PropTypes.number.isRequired,

    deleteTestCase: PropTypes.func.isRequired,
}