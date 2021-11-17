import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// delete button for a single tag

const DeleteTag = props => {
    return (
        <FontAwesomeIcon
            data-testid='delete-tag'
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

DeleteTag.propTypes = {
    disabled: PropTypes.bool.isRequired,
    
    deleteTag: PropTypes.func.isRequired
}

export default DeleteTag;
