import React, { Component } from 'react';

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
                    <span 
                        className="Delete-tag"
                        onClick={this.deleteTag}
                    >x</span>
                </span>
        );
    }
    deleteTag() {
        this.props.deleteTag(this.props.tagName);
    }
}