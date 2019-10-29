import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Description.css'

// description field
class Description extends Component {

    render() {
        return(
            <div className="Description-container">
                <span className="Label">Description</span>
                    <textarea
                        className="Description-input"
                        rows="4"
                        placeholder="Enter new description..."
                        value={this.props.description}
                        onChange={this.handleUserInput}
                        disabled={this.props.disabled}
                    />
            </div>
        );
    }

    handleUserInput = event => {
        this.props.updateDescription(event.target.value);
    }
}

Description.propTypes = {
    description: PropTypes.string.isRequired,
    
    disabled: PropTypes.bool.isRequired,
    
    updateDescription: PropTypes.func.isRequired
}

export default Description;