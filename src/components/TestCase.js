import React, { Component } from 'react';

export function TestCase(props) {
    return (
        <div className="Test-case" depth={props.depth}>
            {props.text}
        </div>
    )
}