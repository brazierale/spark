import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TagList from '../components/TagList';
import StepList from '../components/StepList';
import Description from '../components/Description';

import { StepObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import '../styles/DetailPane.css';
import { 
  addTestCase,
  updateSelectedTestCase,
  updateTestCase
} from '../actions/testcase-actions';

class DetailPane extends Component {
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
  addTag = newTag => {
    const isDuplicate = element => {
      return element === newTag;
    };
    let updatedTagList = [...this.props.selectedTestCase.tags];
        
    // only add if it is not a duplicate
    if (!this.props.selectedTestCase.tags.some(isDuplicate)) {
      updatedTagList = [...this.props.selectedTestCase.tags, newTag];

    }
    this.props.updateSelectedTestCase('tags', updatedTagList);
  };

  deleteTag = toDelete => {
    let updatedTagList = this.props.selectedTestCase.tags.filter(
      tag => tag !== toDelete
    );

    this.props.updateSelectedTestCase('tags', updatedTagList);
  }

  addStep = name => {
    let newStep = new StepObject (
      this.props.selectedTestCase.steps.length,
      name
    );
    let updatedStepList = [...this.props.selectedTestCase.steps, newStep];
    this.props.updateSelectedTestCase('steps', updatedStepList);
  }

  deleteStep = id => {
    let updatedStepList = this.props.selectedTestCase.steps.filter(
      step => step.id !== id
    );

    this.props.updateSelectedTestCase('steps', updatedStepList);
  }

  updateDescription = updatedDescription => {
    this.props.updateSelectedTestCase('description', updatedDescription);
  }

  updateStepList = updatedSteps => {
    this.props.updateSelectedTestCase('steps', updatedSteps);
  }

  save = () => {
    // create new test case if this is the entryRow
    if (this.props.selectedTestCase.key === 0 &&
                this.props.selectedTestCase.summary !== '') {
      const newTestCase = this.props.selectedTestCase;
      newTestCase.key = generateKey();
      newTestCase.sortId = this.props.nextSortId();

      this.props.addTestCase(newTestCase);
    }
    else if (this.props.selectedTestCase.summary === '') {
      // do nothing
    }
    else if (this.props.selectedTestCase.key !== 0) {
      this.props.updateTestCase(this.props.selectedTestCase);
      // forcing update as otherwise the detail pane isn't getting the selectedTestCase updates - not sure why
      this.forceUpdate();
    }
  }

    
}

const mapStateToProps = state => {    
  return {
    selectedTestCase: state.selectedTestCase,
  };
};

const mapDispatchToProps = {
  addTestCase: addTestCase,
  updateTestCase: updateTestCase,
  updateSelectedTestCase: updateSelectedTestCase
};

DetailPane.propTypes = {
  nextSortId: PropTypes.func.isRequired,
  selectedTestCase: PropTypes.func.isRequired,
  addTestCase: PropTypes.func.isRequired,
  updateTestCase: PropTypes.func.isRequired,
  updateSelectedTestCase: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPane);
