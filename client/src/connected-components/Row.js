import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ItemTypes } from '../modules/Constants.js';
import { DragSource, DropTarget } from 'react-dnd';

import TestCaseInput from '../components/TestCaseInput';
import DeleteTestCase from  '../components/DeleteTestCase';
import MoveTestCase from '../components/MoveTestCase';

import { TestCasePropTypes } from '../modules/TestCase';
import { 
  addTestCase,
  deleteTestCaseByKey,
  updateTestCase,
  setSelectedTestCaseByKey,
  updateSelectedTestCase,
  setDragEnabledStatus
} from '../actions/testcase-actions';

class Row extends Component {

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver
    } = this.props;
        
    let classes = classNames({
      'Row': true,
      'Selected-row': this.isSelected(),
      'Test-case-disabled': this.props.testCase.disabled,
      'Hover-over': isOver,
    });

    if (!isDragging) {
      return connectDropTarget(connectDragSource(
        <div className={classes} data-testid="test-case">
          <div className="Test-case-container">
            <TestCaseInput
              testCase={this.props.testCase}
              addTestCase={testCase => this.props.addTestCase(testCase)}
              deleteTestCaseByKey={key => this.props.deleteTestCaseByKey(key)}
              updateTestCase={testCase => this.props.updateTestCase(testCase)}
              setSelectedTestCaseByKey={key => this.props.setSelectedTestCaseByKey(key)}
              updateSelectedTestCaseSummary={summary => this.updateSelectedTestCaseSummary(summary)}
              selectedTestCase={this.props.selectedTestCase}
              isSelected={this.isSelected()}
              nextSortId={this.props.nextSortId}
            />
          </div>
          <MoveTestCase
            testCaseKey={this.props.testCase.key}
            disabled={this.props.testCase.disabled}
            setDragEnabledStatus={bool => this.props.setDragEnabledStatus(bool)}
          />
          <DeleteTestCase 
            testCaseKey={this.props.testCase.key}
            deleteTestCase={this.deleteTestCase}
            disabled={this.props.testCase.disabled}
          />
        </div>
      ));
    }
    else return null;
  }
  updateSelectedTestCaseSummary = summary => {
    this.props.updateSelectedTestCase('summary', summary);
  }
  deleteTestCase = () => {
    if (this.isSelected()) {
      this.props.setSelectedTestCaseByKey(0);
    }
    this.props.deleteTestCaseByKey(this.props.testCase.key);
  }
  isSelected = () => {
    return this.props.testCase.key === this.props.selectedTestCase.key;
  }
}

// actions to carry out when drag starts
const testCaseSource = {
  beginDrag(props) {
    console.log('dragging ' + props.testCase.summary);
    return {testCase: props.testCase};
  },
  canDrag(props) {
    return props.dragEnabled;
  }
};

// actions to carry out when item is dropped
const testCaseTarget = {
  drop(props, monitor) {
    // get the test case we're dropping
    let testCaseToMove = monitor.getItem().testCase;
    // current this is the row being dropped onto, so get the Id to sort above
    testCaseToMove.sortId = props.moveAboveSortId(props.testCase.key);
    props.updateTestCase(testCaseToMove);
  }
};

// set methods for Dragging
const collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

// set methods for Dropping
const collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
};

const mapStateToProps = state => {    
  return {
    selectedTestCase: state.selectedTestCase,
    dragEnabled: state.dragEnabled
  };
};

const mapDispatchToProps = {
  addTestCase: addTestCase,
  deleteTestCaseByKey: deleteTestCaseByKey,
  updateTestCase: updateTestCase,
  setSelectedTestCaseByKey: setSelectedTestCaseByKey,
  updateSelectedTestCase: updateSelectedTestCase,
  setDragEnabledStatus: setDragEnabledStatus
};

Row.propTypes = {
  testCase: TestCasePropTypes.isRequired,
  setSelectedTestCaseByKey: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  dragEnabled: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  moveAboveSortId: PropTypes.func.isRequired,
  nextSortId: PropTypes.func.isRequired,
  selectedTestCase: TestCasePropTypes.isRequired,
  addTestCase: PropTypes.func.isRequired,
  deleteTestCaseByKey: PropTypes.func.isRequired,
  updateTestCase: PropTypes.func.isRequired,
  updateSelectedTestCase: PropTypes.func.isRequired,
  setDragEnabledStatus: PropTypes.func.isRequired
};

// attach the HOC one at a time
const draggableRow = DragSource(ItemTypes.TEST_CASE, testCaseSource, collectDrag)(Row);
const targetableRow = DropTarget(ItemTypes.TEST_CASE, testCaseTarget, collectDrop)(draggableRow);

export default connect(mapStateToProps, mapDispatchToProps)(targetableRow);
