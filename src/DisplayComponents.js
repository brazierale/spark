import React, { Component } from 'react';
import { Input } from './components/Input';
import { TestCaseHeader } from './components/TestCaseHeader'
import { TestCase } from './components/TestCase';
import { Comment } from './components/Comment';
import { Tag } from './components/Tag';

export class DisplayComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [],
        };

        this.addComponent = this.addComponent.bind(this);
    }
    render() {
        return (
            <div>
                {this.state.components}
                <Input addComponent={this.addComponent}/>
            </div>
        )
    }

    addComponent(text, type, depth, testCase) {
        var newArray = this.state.components.slice();
        var component;

        if (type === 'Test-case-header') {
            component = <TestCaseHeader text={text} depth={depth}/>;
        }
        else if (type === 'Test-case') {
            component = <TestCase text={text} depth={depth}/>;
        }
        else if (type === 'Comment') {
            component = <Comment text={text} depth={depth}/>;
        }
        else if (type === 'Tag') {
            component = <Tag text={text} depth={testCase}/>;
        }

        newArray.push(component);
        this.setState({ components: newArray });
    }
}