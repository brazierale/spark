import React, { Component } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import TagList from '../components/TagList';
import StepList from '../components/StepList';
import Description from '../components/Description';
import { StepObject, TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import '../styles/DetailPane.css';
import { 
  addTestCase,
  updateSelectedTestCase,
  updateTestCase
} from '../actions/testcase-actions';

interface DetailPaneProps {
  nextSortId: () => number;
};

class DetailPane extends Component<DetailPaneProps> {
  render() {
    if (this.props.selectedTestCase){
      return (
        <div className="Detail-pane">
          <div className="Debug-key">{this.props.selectedTestCase.key}</div>
          <div className="Detail-pane-header">
            <h1>{this.props.selectedTestCase.summary}</h1>
          </div>
          <div className="Detail-pane-body">
            <Description
              description={this.props.selectedTestCase.description}
              updateDescription={this.updateDescription}
              disabled={this.props.selectedTestCase.disabled}
            />
            <StepList
              steps={this.props.selectedTestCase.steps}
              addStep={this.addStep}
              deleteStep={this.deleteStep}
              updateStepList={this.updateStepList}
              disabled={this.props.selectedTestCase.disabled}
            />
            <TagList 
              tags={this.props.selectedTestCase.tags}
              addTag={this.addTag}
              deleteTag={this.deleteTag}
              disabled={this.props.selectedTestCase.disabled}
            />
          </div>
          <div className="Detail-pane-footer">
            <button 
              className="Save-details"
              disabled={this.props.selectedTestCase.disabled}
              onClick={this.save}
            >Save</button>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
  addTag = ( newTag: string ) => {
    const isDuplicate = ( element: string ) => {
      return element === newTag;
    };
    let updatedTagList = [...this.props.selectedTestCase.tags];
        
    // only add if it is not a duplicate
    if (!this.props.selectedTestCase.tags.some(isDuplicate)) {
      updatedTagList = [...this.props.selectedTestCase.tags, newTag];

    }
    this.props.updateSelectedTestCase('tags', updatedTagList);
  };

  deleteTag = ( toDelete: string ) => {
    let updatedTagList = this.props.selectedTestCase.tags.filter(
      tag => tag !== toDelete
    );

    this.props.updateSelectedTestCase('tags', updatedTagList);
  }

  addStep = ( name: string ) => {
    let newStep = new StepObject (
      this.props.selectedTestCase.steps.length,
      name
    );
    let updatedStepList = [...this.props.selectedTestCase.steps, newStep];
    this.props.updateSelectedTestCase('steps', updatedStepList);
  }

  deleteStep = ( id: number ) => {
    let updatedStepList = this.props.selectedTestCase.steps.filter(
      step => step.id !== id
    );

    this.props.updateSelectedTestCase('steps', updatedStepList);
  }

  updateDescription = ( updatedDescription: string ) => {
    this.props.updateSelectedTestCase('description', updatedDescription);
  }

  updateStepList = ( updatedSteps: StepObject[] ) => {
    this.props.updateSelectedTestCase('steps', updatedSteps);
  }

  save = () => {
    // create new test case if this is the entryRow
    if (this.props.selectedTestCase.key === 'blank' &&
                this.props.selectedTestCase.summary !== '') {
      const newTestCase = this.props.selectedTestCase;
      newTestCase.key = generateKey();
      newTestCase.sortId = this.props.nextSortId();

      this.props.addTestCase(newTestCase);
    }
    else if (this.props.selectedTestCase.summary === '') {
      // do nothing
    }
    else if (this.props.selectedTestCase.key !== 'blank') {
      this.props.updateTestCase(this.props.selectedTestCase);
      // forcing update as otherwise the detail pane isn't getting the selectedTestCase updates - not sure why
      this.forceUpdate();
    }
  }
}

const mapStateToProps = ( state: RootStateOrAny ) => {    
  return {
    selectedTestCase: state.selectedTestCase,
  };
};

const mapDispatchToProps = {
  addTestCase: addTestCase,
  updateTestCase: updateTestCase,
  updateSelectedTestCase: updateSelectedTestCase
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPane);
