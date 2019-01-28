import React, { Component } from 'react';
import classNames from 'classnames';

// delete button for a single tag
export class DeleteTag extends Component {
    render() {
        let classes = classNames({
            'Delete-tag': true,
            'Disabled-delete': this.props.disabled
        })

        return(
            <span 
                className={classes}
                onClick={this.props.deleteTag}
            >
            x
            </span>
        );
    }
}





