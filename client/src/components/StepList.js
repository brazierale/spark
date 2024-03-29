import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Step from './Step';

import { StepPropTypes } from '../modules/TestCase';
import '../styles/Step.css';


// list of steps to run a test case
class StepList extends Component {
  state = {
    newStep: ''
  }
  render() {
    const stepsToRender = this.props.steps.map( step => 
      <Step
        key={step.id}
        step={step}
        deleteStep={this.props.deleteStep}
        updateStep={(id, newName) => this.updateStep(id, newName)}
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

  updateStep = (id, newName) => {
    let updatedStepList = this.props.steps;
    updatedStepList[id].name = newName;

    this.props.updateStepList(updatedStepList);
  }

  handleUserInput = event => {
    this.setState({ newStep: event.target.value });
  }

  handleKeyDown = event => {
    if (event.key === 'Enter' || event.keyCode === 9) {
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

StepList.propTypes = {
  steps: StepPropTypes,
  disabled: PropTypes.bool.isRequired,
  addStep: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  updateStepList: PropTypes.func.isRequired,
};

export default StepList;
