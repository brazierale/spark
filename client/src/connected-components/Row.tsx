import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';
import { ItemTypes } from '../modules/Constants.js';
import { DragSource, DragSourceConnector, DragSourceMonitor, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import TestCaseInput from '../components/TestCaseInput';
import DeleteTestCase from  '../components/DeleteTestCase';
import MoveTestCase from '../components/MoveTestCase';
import { TestCaseObject } from '../modules/TestCase';
import { 
  addTestCase,
  deleteTestCaseByKey,
  updateTestCase,
  setSelectedTestCaseByKey,
  updateSelectedTestCase,
  setDragEnabledStatus
} from '../actions/testcase-actions';
import { RootState } from '../index';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';


const mapStateToProps = ( state: RootState ) => {    
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

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface RowProps extends PropsFromRedux {
  testCase: TestCaseObject;
  moveAboveSortId: (key: string) => void;
  nextSortId: () => number;
  connectDragSource: (element: ReactNode) => ReactNode;
  connectDropTarget: (element: ReactNode) => ReactNode;
  isDragging: boolean;
  isOver: boolean;
}

class Row extends Component<RowProps> {
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

  updateSelectedTestCaseSummary = ( summary: string ) => {
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
  beginDrag(props: RowProps) {
    console.log('dragging ' + props.testCase.summary);
    return {testCase: props.testCase};
  },
  canDrag(props: RowProps) {
    return props.dragEnabled;
  }
};

// actions to carry out when item is dropped
const testCaseTarget = {
  drop(props: RowProps, monitor: DropTargetMonitor) {
    // get the test case we're dropping
    let testCaseToMove = monitor.getItem().testCase;
    // current this is the row being dropped onto, so get the Id to sort above
    testCaseToMove.sortId = props.moveAboveSortId(props.testCase.key);
    props.updateTestCase(testCaseToMove);
  }
};

// set methods for Dragging
const collectDrag = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

// set methods for Dropping
const collectDrop = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
};

// attach the HOC one at a time
const draggableRow = DragSource(ItemTypes.TEST_CASE, testCaseSource, collectDrag)(Row);
const targetableRow = DropTarget(ItemTypes.TEST_CASE, testCaseTarget, collectDrop)(draggableRow);

export default connector(targetableRow);
