import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// delete button for a single tag

const DeleteTag = props => {
    return (
        <FontAwesomeIcon
            className={Classes(props.disabled)}
            icon={faTimes}
            onClick={props.deleteTag}
        />
    );
}

const Classes = disabled => {
    return classNames({
        'Delete-tag': true,
        'Disabled-delete': disabled
    });
}

export default DeleteTag;

DeleteTag.propTypes = {
    disabled: PropTypes.bool.isRequired,

    deleteTag: PropTypes.func.isRequired
}