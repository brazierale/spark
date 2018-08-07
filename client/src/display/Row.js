import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TestCaseInput } from './TestCaseInput'
import { DeleteTestCase } from  './DeleteTestCase';

export class Row extends Component {
    constructor(props) {
        super(props);

        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    render() {
        return (
            <div className="Row">
                <div className="Test-case-container">
                    <TestCaseInput
                        testCaseId={this.props.testCaseId}
                        testCaseSummary={this.props.testCaseSummary}
                        createTestCase={this.props.createTestCase}
                        updateTestCase={this.props.updateTestCase}
                        deleteTestCase={this.props.deleteTestCase}
                        setSelectedTestCase={this.props.setSelectedTestCase}
                        selectedTestCaseId={this.props.selectedTestCaseId}
                    />
                </div>
                <DeleteTestCase 
                    testCaseId={this.props.testCaseId}
                    deleteTestCase={this.props.deleteTestCase}
                />
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Row-id">
                    {this.props.testCaseId}
                </div>
            </div>
        )
    }

    //not implemented - will move row up but need to consider missing ids and parents
    handleUp(e) {
        console.log('move row up');
    }

    //not implemented - will move row down but need to consider missing ids and parents
    handleDown(e) {
        console.log('move row down');
    }
}

Row.propTypes = {
    testCaseId: PropTypes.number.isRequired,

    createTestCase: PropTypes.func.isRequired,
    updateTestCase: PropTypes.func.isRequired,
    deleteTestCase: PropTypes.func.isRequired,
    setSelectedTestCase: PropTypes.func.isRequired,
}