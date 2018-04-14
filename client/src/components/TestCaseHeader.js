import React from 'react';

export function TestCaseHeader(props) {
    return (
        <div className="Test-case-header" depth={props.depth}>
            {props.text}
        </div>
    )
}