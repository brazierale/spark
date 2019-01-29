import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailPane from './DetailPane'
import TestCaseList from '../components/TestCaseList';
import Indicator from '../components/Indicator';

import { getTestCases } from '../actions/testcase-actions';

class MainContainer extends Component {

    componentDidMount() {
        this.props.getTestCases();
    }

    render() {
        return(
            <div className="Main-container">
                <Indicator
                    loading={this.props.loading}
                    saving={this.props.saving}
                />
                <div className="Test-case-list-container">
                    <TestCaseList testCases={this.props.testCases} />
                </div>
                <div className="Detail-pane-container">
                    <DetailPane />
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
        saving: state.saving,
        error: state.error
    }
};

const mapDispatchToProps = {
    getTestCases: getTestCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);