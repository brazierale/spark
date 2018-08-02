import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import './Display.css'

export class DisplayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };

    }
    render() {
        return (
            <div className="Display-input">
                {this.state.rows}
                <Input createTestCase={this.props.createTestCase}/>
            </div>
        )
    }
}

DisplayInput.propTypes = {
    createTestCase: PropTypes.func.isRequired
}