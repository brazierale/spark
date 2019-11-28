import React from 'react';
import PropTypes from 'prop-types';

const TagFilter = props => {
    
    let color = 'black'
    if (props.enabled) { color = 'blue' }

    let style = {
        color: color,
        padding: "60px"
    }

    return (
        <div
            onClick={props.filterByTag}
            style={style}
        >
        {props.tag}
        </div>
    )
}

TagFilter.propTypes = {
    tag: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,

    filterByTag: PropTypes.func.isRequired
}

export default TagFilter