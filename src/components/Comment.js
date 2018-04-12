import React from 'react';

export function Comment(props) {
    return (
        <div className="Comment" depth={props.depth}>
            {props.text}
        </div>
    )
}