import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTestCase, getTestCases, setSelectedTestCaseById } from './actions/testcase-actions';
import { TestCase } from './modules/TestCase';
import { TestCaseList } from './TestCaseList';
import { DetailPane } from './DetailPane'
import './Display.css'

class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.onAddTestCase = this.onAddTestCase.bind(this);
    }

    componentDidMount() {
        this.props.onGetTestCases();
    }

    onAddTestCase() {
        const newTestCase = new TestCase('10', 'adding this using redux');
        this.props.onAddTestCase(newTestCase);
    }

    render() {
        return(
            <div className="Main-container">
                <div className="Test-case-list-container">
                    <h1>Test</h1>
                    <TestCaseList
                        testCases={this.props.testCases}
                    />
                </div>
                <div className="Detail-pane-container">
                    <DetailPane selectedTestCaseId={this.props.selectedTestCase.id} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {    
    return {
        testCases: state.testCases,
        selectedTestCase: state.selectedTestCase.id,
        loading: state.loading,
        error: state.error
    }
};

const mapActionsToProps = {
    onAddTestCase: addTestCase,
    onGetTestCases: getTestCases,

};

export default connect(mapStateToProps, mapActionsToProps)(MainContainer);