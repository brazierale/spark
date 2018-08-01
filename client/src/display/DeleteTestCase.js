import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DeleteTestCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.testCaseId,
        }
        
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    render() {
        return (
            <div className="Delete-row"
                type="text"
                onClick={this.deleteTestCase}
            >
            x
            </div>
        );
    }

    deleteTestCase() {
        this.props.deleteTestCase(this.state.id);
    }
}

DeleteTestCase.propTypes = {
    testCaseId: PropTypes.number.isRequired,
    
    deleteTestCase: PropTypes.func.isRequired,
}