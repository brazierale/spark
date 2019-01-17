import React, { Component } from 'react';

// single step
export class Step extends Component {
    constructor(props) {
        super(props);

        this.deleteStep = this.deleteStep.bind(this);
    }
    render() {
        return(
                <span className="Step">
                    {this.props.stepName}
                    <span 
                        className="Delete-step"
                        onClick={this.deleteStep}
                    >x</span>
                </span>
        );
    }
    deleteStep() {
        this.props.deleteStep(this.props.stepName);
    }
}