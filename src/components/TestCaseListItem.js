import React, { Component } from 'react';

export function TestCaseListItem(props) {
    return (
        <div className={props.type}>{props.text}</div>
    );
}