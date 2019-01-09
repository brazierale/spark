import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTestCase, getTestCases } from './actions/testcase-actions';
import { TestCase } from './modules/TestCase';

class App extends Component {
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
        let i = 0;
        const testCasesToRender = this.props.testCases.map(testCase => 
            <div key={testCase.id}>{i++}  :  {testCase.summary}</div>
        );
        return (
            <div>
                <h1>Test</h1>
                <button onClick={this.onAddTestCase}>ADD TESTCASE</button>
                <div>{testCasesToRender}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {    
    return {
        testCases: state.testCases,
        loading: state.loading,
        error: state.error
    }
};

const mapActionsToProps = {
    onAddTestCase: addTestCase,
    onGetTestCases: getTestCases
};

export default connect(mapStateToProps, mapActionsToProps)(App);