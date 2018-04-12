import React, { Component } from 'react';

export function Tag(props) {
    return (
        <div className="Tag" testCase={props.testCaseId}>
            {props.text}
        </div>
    )
}