import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

// icon to reorder test case, currently only visual
export class MoveTestCase extends Component {
    render() {
        if (this.props.testCaseKey !== 0 && this.props.disabled !== true) {
            return (
                <FontAwesomeIcon
                    className="Move-row"
                    icon={faArrowsAlt}
                    size="sm"
                />
            );
        }
        else {
            return null;
        }
    }
}