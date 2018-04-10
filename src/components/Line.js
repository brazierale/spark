import React, { Component } from 'react';

export function TestCaseGroup(props) {
    return (
        <div className="Test-case-group" depth={props.depth}>
            {props.text}
        </div>
    )
}

export function TestCase(props) {
    return (
        <div className="Test-case" depth={props.depth}>
            {props.text}
        </div>
    )
}

export function Comment(props) {
    return (
        <div className="Comment" depth={props.depth}>
            {props.text}
        </div>
    )
}

export function Tag(props) {
    return (
        <div className="Comment" testCase={props.testCaseId}>
            {props.text}
        </div>
    )
}