import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailPane from './DetailPane'
import TestCaseList from '../components/TestCaseList';
import Indicator from '../components/Indicator';
import TagFilter from '../components/TagFilter';

import { getTestCases, filterByTag } from '../actions/testcase-actions';
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
                    tagFilters={this.props.tagFilters}
                />
                <TagFilter
                    tag={'test'}
                    filterByTag={this.filterByTag}
                    tagFilters={this.props.tagFilters}
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

    filterByTag = tag => {
        this.props.filterByTag(tag);
    }

}

const mapStateToProps = state => {    
    return {
        testCases: state.testCases,
        selectedTestCase: state.selectedTestCase,
        loading: state.loading,
        saving: state.saving,
        error: state.error,
        tagFilters: state.tagFilters
    }
}

const mapDispatchToProps = {
    getTestCases: getTestCases,
    filterByTag: filterByTag
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);