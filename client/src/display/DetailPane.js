import React, { Component } from 'react';

export class DetailPane extends Component {

    render() {
        if (this.props.details){
            return (
                <div className="Detail-pane">
                    <div className="Detail-pane-header">
                        <h1>{this.props.details.Summary}</h1>
                    </div>
                </div>
            )            
        }
        else {
            return null
        }
    }
}

