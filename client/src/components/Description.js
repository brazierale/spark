import React, { Component } from 'react';

import '../support/Description.css'

// description field
export class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    render() {
        return(
            <div className="Description-container">
                <span className="Label">Description: </span>
                    <textarea
                        className="Description-input"
                        rows="4"
                        placeholder="Enter new description..."
                        value={this.state.description}
                        onChange={this.handleUserInput}
                        onBlur={this.handleBlur}
                    />
            </div>
        );
    }

    handleBlur() {
        this.props.updateDescription(this.state.description);
    }

    handleUserInput(e) {
        this.setState({ description: e.target.value})
    }
}