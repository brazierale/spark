import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// single step
class Step extends Component {

  render() {
    let stepClasses = classNames({
      'Step': true,
      'Disabled': this.props.disabled
    });

    return(
      <div className="Step-container" data-testid="step">
        <input
          data-testid="step-checkbox"
          className="Step-checkbox"
          type="checkbox"
          disabled={this.props.disabled}
        />
        <div className={stepClasses}>
          <textarea
            data-testid="step-input"
            className="Step-edit"
            rows="1"
            wrap="off"
            value={this.props.step.name}
            onChange={this.handleUserInput}
            disabled={this.props.disabled}
          />
          <span
            data-testid="step-delete"
            className="Delete-step"
            onClick={this.deleteStep}
          >x</span>
        </div>
      </div>
    );
  }

  deleteStep = () => {
    this.props.deleteStep(this.props.step.id);
  }

  handleUserInput = event => {
    this.props.updateStep(this.props.step.id, event.target.value);
  }
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  deleteStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired
};

export default Step;
