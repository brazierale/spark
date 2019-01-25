import React, { Component } from 'react';

// single tag which will in future act as a link to filtering
export class Indicator extends Component {
    render() {

        if (this.props.loading) {
            return <div className="Loading"/>
        }
        else if (this.props.saving) {
            return <div className="Saving"/>
        }
        else {
            return null;
        }
    }
}