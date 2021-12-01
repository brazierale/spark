import React, { Component } from 'react';
import Step from './Step';
import { StepObject } from '../modules/TestCase';
import '../styles/Step.css';

interface StepListProps {
  disabled: boolean;
  steps: StepObject[];
  deleteStep: (id: number) => void;
  addStep: (newStep: string) => void;
  updateStepList: (updatedStepList: StepObject[]) => void;
}

// list of steps to run a test case
class StepList extends Component<StepListProps> {
  state = {
    newStep: ''
  }
  render() {
    const stepsToRender = this.props.steps.map( step => 
      <Step
        key={step.id}
        step={step}
        deleteStep={this.props.deleteStep}
        updateStep={(id: number, newName: string) => this.updateStep(id, newName)}
        disabled={this.props.disabled}
      />
    );

    return(
      <div data-testid="step-list" className="Step-list-container">
        <span className="Label">Steps</span>
        <span className="Step-list">
          {stepsToRender}
          <input
            data-testid="step-new"
            className="Step-input"
            placeholder="Enter new step..."
            value={this.state.newStep}
            onChange={this.handleUserInput}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            disabled={this.props.disabled}
          />
        </span>
      </div>
    );
  }

  updateStep = (id: number, newName: string) => {
    let updatedStepList = this.props.steps;
    updatedStepList[id].name = newName;

    this.props.updateStepList(updatedStepList);
  }

  handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newStep: event.target.value });
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (this.state.newStep !== '') {
        event.preventDefault();
        this.props.addStep(this.state.newStep);
        this.setState({ newStep: '' });
      }
    }
  }

  handleBlur = () => {
    if (this.state.newStep !== '') {
      this.props.addStep(this.state.newStep);
    }
    this.setState({ newStep: '' });
  }
}

export default StepList;
