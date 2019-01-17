import React, { Component } from 'react';

import '../support/Description.css'

// description field
export class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
        console.log(this.props)
        console.log(this.state)
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
                    >
                    {this.state.description}
                    </textarea>
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