import React, { Component } from 'react';

import { Tag } from './Tag';
import '../support/Tag.css'


// list of tags
export class TagList extends Component {

    render() {
        const tagsToRender = this.props.tags.map( tag => 
            <Tag tagName={tag} />
        );

        return(
            <div className="Tag-list-container">
                <span>Tags: </span>
                <span className="Tag-list">
                    {tagsToRender}
                    <input
                        className="Tag-input"
                        placeholder="Enter new tag..."
                    />
                </span>
            </div>
        );
    }
}