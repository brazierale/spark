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
    }
    render() {
        return (
            <div>
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
                <Row rowId={id}>
                    <TestCaseHeader text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Test-case') {
            row = (
                <Row rowId={id}>
                    <TestCase text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Comment') {
            row = (
                <Row rowId={id}>
                    <Comment text={text} depth={depth}/>
                </Row>
            );
        }
        else if (type === 'Tag') {
            row = (
                <Row rowId={id}>
                    <Tag text={text} depth={testCase}/>
                </Row>
            );
        }

        newArray.push(row);
        this.setState({ rows: newArray });
    }
}