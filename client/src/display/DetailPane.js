import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DetailPane extends Component {

    render() {
        if (this.props.selectedTestCase){
            return (
                <div className="Detail-pane">
                    <div className="Detail-pane-header">
                        <h1>{this.props.selectedTestCase.summary}</h1>
                    </div>
                </div>
            )            
        }
        else {
            return null
        }
    }
}

DetailPane.propTypes = {
    selectedTestCase: PropTypes.object,
}