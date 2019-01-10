import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTestCase, getTestCases } from '../actions/testcase-actions';
import { TestCase } from '../modules/TestCase';
import { TestCaseList } from '../components/TestCaseList';
import { DetailPane } from '../components/DetailPane'
import '../support/Display.css'

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
                    <TestCaseList
                        testCases={this.props.testCases}
                    />
                </div>
                <div className="Detail-pane-container">
                    <DetailPane selectedTestCase={this.props.selectedTestCase} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {    
    return {
        testCases: state.testCases,
        selectedTestCase: state.selectedTestCase,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    onAddTestCase: addTestCase,
    onGetTestCases: getTestCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);