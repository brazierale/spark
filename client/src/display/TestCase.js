import React from 'react';

export function TestCase(props) {
    return (
        <input className="Test-case"
            type="text"
            defaultValue={props.summary}
        />
    )
}