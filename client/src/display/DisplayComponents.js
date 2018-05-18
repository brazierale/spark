import React, { Component } from 'react';
import { Row } from './Row';
import { Input } from '../components/Input';
import { TestCaseHeader } from '../components/TestCaseHeader'
import { TestCase } from '../components/TestCase';
import { Comment } from '../components/Comment';
import { Tag } from '../components/Tag';
import './Display.css'

export class DisplayComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };

        this.addComponent = this.addComponent.bind(this);
        this.swapRows = this.swapRows.bind(this);
    }
    render() {
        return (
            <div className="Test-cases">
                {this.state.rows}
                <Input addComponent={this.addComponent}/>
            </div>
        )
    }

    addComponent(text, type, depth, testCase) {
        var newArray = this.state.rows.slice();
        var row;
        var id = this.state.rows.length;

        if (type === 'Test-case-header') {
            row = (
                <Row key={id} swapRows={this.swapRows}>
                    <TestCaseHeader text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Test-case') {
            row = (
                <Row key={id} swapRows={this.swapRows}>
                    <TestCase text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Comment') {
            row = (
                <Row key={id} swapRows={this.swapRows}>
                    <Comment text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Tag') {
            row = (
                <Row key={id} swapRows={this.swapRows}>
                    <Tag text={text} depth={testCase}/>
                </Row>
            );
        }

        newArray.push(row);
        this.setState({ rows: newArray });
    }

    swapRows(oldId, direction) {
        // ***WIP***
        // this swaps the rows based on their ID. However, it needs to update the id of the row too (or track it in a different way) for this to work properly
        let newArray = this.state.rows.slice();
        let numbers = [];
        let newId = oldId;

        if (oldId > 0 || direction === 'up') {
            newId--
        }
        else if (oldId < this.state.rows.length || direction === 'down') {
            newId++
        }

        let rowToMove = this.state.rows[oldId];
        let rowToSwapWith = this.state.rows[newId];

        newArray[newId] = rowToMove;
        newArray[oldId] = rowToSwapWith;

        for (let i = 0; i < newArray.length; i++) {
            numbers.push(i);
        }

        this.setState({ rows: newArray });
    }
}