import React, { Component } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// delete button for a single tag
export class DeleteTag extends Component {
    render() {
        let classes = classNames({
            'Delete-tag': true,
            'Disabled-delete': this.props.disabled
        })

        return(
                <FontAwesomeIcon
                    className={classes}
                    icon={faTimes}
                    onClick={this.props.deleteTag}
                />
        );
    }
}





