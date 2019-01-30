import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tag from './Tag';

import '../styles/Tag.css';


// list of tags
class TagList extends Component {
    state = {
        newTag: ''
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

    handleUserInput = event => {
        this.setState({ newTag: event.target.value})
    }

    handleKeyDown = event => {
        if (event.key === 'Enter' || event.keyCode === 9) {
            event.preventDefault();
            this.props.addTag(this.state.newTag);
            this.setState({ newTag: '' })
        }
    }

    handleBlur = () => {
        this.setState({ newTag: '' })
    }
}

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    disabled: PropTypes.bool.isRequired,
    
    deleteTag: PropTypes.func.isRequired
}

export default TagList;