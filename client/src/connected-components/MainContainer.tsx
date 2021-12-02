import React, { Component } from 'react';
import { TestCaseObject } from '../modules/TestCase';
import { connect, ConnectedProps } from 'react-redux';
import DetailPane from './DetailPane';
import TestCaseList from '../components/TestCaseList';
import Indicator from '../components/Indicator';
import { getTestCases } from '../actions/testcase-actions';
import { generateSortId } from '../modules/KeyGen';
import { RootState } from '../index';

const mapStateToProps = ( state: RootState ) => {    
  return {
    testCases: state.testCases,
    selectedTestCase: state.selectedTestCase,
    loading: state.loading,
    saving: state.saving,
    error: state.error
  };
};

const mapDispatchToProps = {
  getTestCases: getTestCases,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

class MainContainer extends Component<PropsFromRedux> {

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
      );
    }
    else {
      return generateSortId(0);
    }
  }
}

export default connector(MainContainer);
