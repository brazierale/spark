import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

// icon to reorder test case, currently only visual
const MoveTestCase = props => {
    if (props.testCaseKey !== 0 && props.disabled !== true) {
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

export default MoveTestCase;

MoveTestCase.propTypes = {
    testCaseKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    
    disabled: PropTypes.bool.isRequired
}