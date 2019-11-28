import React from 'react';
import PropTypes from 'prop-types';

const TagFilter = props => {
    
    let color = 'black'
    if (props.tagFilters.find((tag) => tag === props.tag)) { color = 'blue' }

    let style = {
        color: color,
        padding: "60px"
    }

    return (
        <div
            onClick={() => props.filterByTag(props.tag)}
            style={style}
        >
        {props.tag}
        </div>
    )
}

TagFilter.propTypes = {
    tag: PropTypes.string.isRequired,
    tagFilters: PropTypes.array.isRequired,
    
    filterByTag: PropTypes.func.isRequired
}

export default TagFilter