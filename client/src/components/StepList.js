import React, { Component } from 'react';

import { Step } from './Step';
import '../support/Step.css'


// list of steps to run a test case
export class StepList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStep: ''
        }
        this.updateStep = this.updateStep.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    render() {
        const stepsToRender = this.props.steps.map( step => 
            <Step
                key={step.id}
                step={step}
                deleteStep={this.props.deleteStep}
                updateStep={(id, newName) => this.updateStep(id, newName)}
            />
        );

        return(
            <div className="Step-list-container">
                <span className="Label">Steps</span>
                <span className="Step-list">
                    {stepsToRender}
                    <input
                        className="Step-input"
                        placeholder="Enter new step..."
                        value={this.state.newStep}
                        onChange={this.handleUserInput}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
                    />
                </span>
            </div>
        );
    }

    updateStep(id, newName) {
        let updatedStepList = this.props.steps;
        updatedStepList[id].name = newName;

        this.props.updateStepList(updatedStepList);
    }

    handleUserInput(e) {
        this.setState({ newStep: e.target.value})
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' || e.keyCode === 9) {
            e.preventDefault();
            this.props.addStep(this.state.newStep);
            this.setState({ newStep: '' })
        }
    }

    handleBlur() {
        if (this.state.newStep !== '') {
            this.props.addStep(this.state.newStep);
        }
        this.setState({ newStep: '' })
    }
}