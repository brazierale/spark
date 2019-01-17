import React, { Component } from 'react';

import { Tag } from './Tag';
import '../support/Tag.css'


// list of tags
export class TagList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTag: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    render() {
        let key = 0;
        const tagsToRender = this.props.tags.map( tag => 
            <Tag
                key={key++} 
                tagName={tag}
                deleteTag={this.props.deleteTag}
            />
        );

        return(
            <div className="Tag-list-container">
                <span className="Label">Tags</span>
                <span className="Tag-list">
                    {tagsToRender}
                    <input
                        className="Tag-input"
                        placeholder="Enter new tag..."
                        value={this.state.newTag}
                        onChange={this.handleUserInput}
                        onKeyPress={this.handleKeyPress}
                        onBlur={this.handleBlur}
                    />
                </span>
            </div>
        );
    }

    handleUserInput(e) {
        this.setState({ newTag: e.target.value})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.addTag(e.target.value);
            this.setState({ newTag: '' })
        }
    }

    handleBlur() {
        this.setState({ newTag: '' })
    }
}