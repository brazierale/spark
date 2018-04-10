import React, { Component } from 'react';

export function Tag(props) {
    return (
        <div className="Comment" testCase={props.testCaseId}>
            {props.text}
        </div>
    )
}