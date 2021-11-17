import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// single step
class Step extends Component {

    render() {
        let stepClasses = classNames({
                'Step': true,
                'Disabled': this.props.disabled
        })

        return(
                <div className="Step-container">
                    <input
                        data-testid="step-checkbox"
                        className="Step-checkbox"
                        type="checkbox"
                        disabled={this.props.disabled}
                    />
                    <div className={stepClasses}>
                        <input
                            data-testid="step-description"
                            className="Step-edit"
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
    
    disabled: PropTypes.bool.isRequired
}

export default Step;
