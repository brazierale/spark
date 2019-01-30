import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../support/Description.css'

// description field
class Description extends Component {
    state = {
        description: this.props.description
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // required to update the state when selecting a different test case
        if (prevState.description !== nextProps.description) {
            return {
                description: nextProps.description
            }
        }
        
        return null;
    }

    render() {
        return(
            <div className="Description-container">
                <span className="Label">Description</span>
                    <textarea
                        className="Description-input"
                        rows="4"
                        placeholder="Enter new description..."
                        value={this.state.description}
                        onChange={this.handleUserInput}
                        onBlur={this.handleBlur}
                        disabled={this.props.disabled}
                    />
            </div>
        );
    }

    handleBlur = () => {
        this.props.updateDescription(this.state.description);
    }

    handleUserInput = event => {
        this.setState({ description: event.target.value });
    }
}

Description.propTypes = {
    description: PropTypes.string.isRequired,
    
    disabled: PropTypes.bool.isRequired,
    
    updateDescription: PropTypes.func.isRequired
}

export default Description;