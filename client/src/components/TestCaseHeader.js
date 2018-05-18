import React from 'react';

export function TestCaseHeader(props) {
    return (
        <input className="Test-case-header"
            type="text"
            value={props.text}
            depth={props.depth}
        />
    )
}