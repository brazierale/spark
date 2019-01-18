import React, { Component } from 'react';

// single step
export class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepName: props.step.name
        }

        this.deleteStep = this.deleteStep.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // required to update the state when selecting a different test case
        if (prevState.stepName !== nextProps.step.name) {
            return {
                stepName: nextProps.step.name
            }
        }
        
        return null;
    }

    render() {
        return(
                <div className="Step-container">
                    <input
                        className="Step-checkbox"
                        type="checkbox"
                    />
                    <div className="Step">
                        <input 
                            className="Step-edit"
                            value={this.state.stepName}
                            onChange={this.handleUserInput}
                            onBlur={this.handleBlur}
                        />
                        <span 
                            className="Delete-step"
                            onClick={this.deleteStep}
                        >x</span>
                    </div>
                </div>
        );
    }
    deleteStep() {
        this.props.deleteStep(this.props.step.id);
    }

    handleBlur() {
        this.props.updateStep(this.props.step.id, this.state.stepName);
    }

    handleUserInput(e) {
        this.setState({ stepName: e.target.value })
    }
}