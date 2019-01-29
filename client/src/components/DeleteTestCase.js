import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// x button to delete a test case
const DeleteTestCase = props => {
    if (props.testCaseKey !==0 && props.disabled !== true) {
        return (
            <FontAwesomeIcon
                className="Delete-row"
                icon={faTimes}
                onClick={props.deleteTestCase}
            />
        );
    }
    else {
        return null
    }
}

export default DeleteTestCase;

DeleteTestCase.propTypes = {
    testCaseKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),

    disabled: PropTypes.bool.isRequired,
    
    deleteTestCase: PropTypes.func.isRequired
}