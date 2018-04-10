import React, { Component } from 'react';
import { TestCaseEntry } from './TestCaseEntry';
import { TestCase, Comment, Tag } from './Line';
import './TestCase.css';

export class LineList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineItems: []
        };

        this.addTestCase = this.addLine.bind(this);
    }
    render() {
        return (
            <div>
                {this.state.lineItems}
                <TestCaseEntry addLine={this.addLine}/>
            </div>
        )
    }

    addLine(text, type, depth, testCase) {
        var newArray = this.state.lineItems.slice();
        var line;

        if (type === "Test-case-group") {
            line = <TestCaseGroup text={props.text} depth={props.depth}/>;
        }
        else if (type === 'Test-case') {
            line = <TestCase text={props.text} depth={props.depth}/>;
        }
        else if (type === 'Comment') {
            line = <Comment text={props.text} depth={props.depth}/>;
        }
        else if (type === 'Tag') {
            line = <Tag text={props.text} depth={props.testCase}/>;
        }

        newArray.push(line);
        this.setState({ lineItems: newArray });
    }
}