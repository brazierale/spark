import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// single step
class Step extends Component {
    state = {
        stepName: this.props.step.name
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
        let stepClasses = classNames({
                'Step': true,
                'Disabled': this.props.disabled
        })

        return(
                <div className="Step-container">
                    <input
                        className="Step-checkbox"
                        type="checkbox"
                        disabled={this.props.disabled}
                    />
                    <div className={stepClasses}>
                        <input 
                            className="Step-edit"
                            value={this.state.stepName}
                            onChange={this.handleUserInput}
                            onBlur={this.handleBlur}
                            disabled={this.props.disabled}
                        />
                        <span 
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

    handleBlur = () => {
        this.props.updateStep(this.props.step.id, this.state.stepName);
    }

    handleUserInput = event => {
        this.setState({ stepName: event.target.value });
    }
}

Step.propTypes = {
    step: PropTypes.object.isRequired,
    
    disabled: PropTypes.bool.isRequired
}

export default Step;