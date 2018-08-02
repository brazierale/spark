import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from './Row';
import { Input } from './Input';
import { TestCaseInput } from './TestCaseInput';
import './Display.css'

export class DisplayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };

        this.addComponent = this.addComponent.bind(this);
    }
    render() {
        return (
            <div className="Display-input">
                {this.state.rows}
                <Input addComponent={this.addComponent} createTestCase={this.props.createTestCase}/>
            </div>
        )
    }

    addComponent(text, id) {
        console.log(`Adding component ${id}, ${text}`)
        var newArray = this.state.rows.slice();
        var row;

        row = (
            <Row key={id}>
                <TestCaseInput summary={text}/>
            </Row>
        );

        newArray.push(row);
        this.setState({ rows: newArray });
    }
}

DisplayInput.propTypes = {
    createTestCase: PropTypes.func.isRequired
}