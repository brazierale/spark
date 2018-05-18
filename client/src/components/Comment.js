import React from 'react';

export function Comment(props) {
    return (
        <input className="Comment"
            type="text"
            value={props.text}
            depth={props.depth}
        />
    )
}