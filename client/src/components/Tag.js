import React, { Component } from 'react';
import { DeleteTag } from './DeleteTag';

// single tag which will in future act as a link to filtering
export class Tag extends Component {
    constructor(props) {
        super(props);

        this.deleteTag = this.deleteTag.bind(this);
    }
    render() {
        return(
                <span className="Tag">
                    {this.props.tagName}
                    <DeleteTag
                        deleteTag={this.props.deleteTag}
                        disabled={this.props.disabled}
                    />
                </span>
        );
    }
    deleteTag() {
        this.props.deleteTag(this.props.tagName);
    }
}