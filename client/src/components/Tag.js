import React from 'react';

export function Tag(props) {
    return (
        <input className="Tag"
            type="text"
            value={props.text}
            testCase={props.testCaseId}
        />
    )
}