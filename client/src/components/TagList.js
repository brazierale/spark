import React, { Component } from 'react';
import classNames from 'classnames';

import Tag from './Tag';
import '../support/Tag.css';


// list of tags
export class TagList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTag: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    render() {
        let key = 0;
        const tagsToRender = this.props.tags.map( tag => 
            <Tag
                key={key++} 
                tagName={tag}
                deleteTag={() => this.props.deleteTag(tag)}
                disabled={this.props.disabled}
            />
        );

        let listClasses = classNames({
            'Tag-list': true,
            'Disabled': this.props.disabled
        })

        return(
            <div className="Tag-list-container">
                <span className="Label">Tags</span>
                <span className={listClasses}>
                    {tagsToRender}
                    <input
                        className="Tag-input"
                        placeholder="Enter new tag..."
                        value={this.state.newTag}
                        onChange={this.handleUserInput}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
                        disabled={this.props.disabled}
                    />
                </span>
            </div>
        );
    }

    handleUserInput(e) {
        this.setState({ newTag: e.target.value})
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' || e.keyCode === 9) {
            e.preventDefault();
            this.props.addTag(this.state.newTag);
            this.setState({ newTag: '' })
        }
    }

    handleBlur() {
        this.setState({ newTag: '' })
    }
}