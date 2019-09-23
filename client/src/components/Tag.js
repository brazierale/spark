import React from 'react';
import PropTypes from 'prop-types';

import DeleteTag from './DeleteTag';

// single tag which will in future act as a link to filtering
const Tag = props => {
    return(
        <span className="Tag">
            {props.tagName}
            <DeleteTag
                tagName={props.tagName}
                deleteTag={props.deleteTag}
                disabled={props.disabled}
            />
        </span>
    );
}

Tag.propTypes = {
    tagName: PropTypes.string.isRequired,
    
    disabled: PropTypes.bool.isRequired,
    
    deleteTag: PropTypes.func.isRequired,
}

export default Tag;