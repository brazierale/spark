import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DetailPane extends Component {

    render() {
        if (this.props.details){
            return (
                <div className="Detail-pane">
                    <div className="Detail-pane-header">
                        <h1>{this.props.details.summary}</h1>
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
    //currently this will be a boolean (false) or object (test case from api) this should be updated to a new TestCase object
    details: PropTypes.object,
}