import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailPane from './DetailPane'
import TestCaseList from '../components/TestCaseList';
import Indicator from '../components/Indicator';
import TagFilter from '../components/TagFilter';

import { getTestCases } from '../actions/testcase-actions';
import { generateSortId } from '../modules/KeyGen';

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
                <TagFilter
                    tag={'working'}
                    filterByTag={this.filterByTag}
                    enabled={false}
                />
                <div className="Test-case-list-container">
                    <TestCaseList 
                        testCases={this.props.testCases}
                        nextSortId={this.nextSortId}
                    />
                </div>
                <div className="Detail-pane-container">
                    <DetailPane nextSortId={this.nextSortId}/>
                </div>
            </div>
        );
    }

    // this should move elsewhere, but I'm not sure where yet
    nextSortId = () => {
        if (this.props.testCases[this.props.testCases.length-2]) {
            return generateSortId(
                this.props.testCases[this.props.testCases.length-2].sortId
            )
        }
        else {
            return generateSortId(0);
        }
    }

    filterByTag = () => {
        console.log("HIIIIIII")
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
}

const mapDispatchToProps = {
    getTestCases: getTestCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);