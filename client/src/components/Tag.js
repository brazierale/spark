import React, { Component } from 'react';

// single tag which will in future act as a link to filtering
export class Tag extends Component {

    render() {
        return(
                <span className="Tag">
                    {this.props.tagName}
                    <span className="Delete-tag">x</span>
                </span>
        );
    }
}