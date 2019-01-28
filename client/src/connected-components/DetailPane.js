import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    addTestCase,
    updateSelectedTestCase,
    updateTestCase
} from '../actions/testcase-actions';
import { TagList } from '../components/TagList';
import { StepList } from '../components/StepList';
import { Description } from '../components/Description';
import { TestCase, Step } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import '../support/DetailPane.css'

// right-hand pane displaying details of selected test case
class DetailPane extends Component {
    constructor(props) {
        super(props);

        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.addStep = this.addStep.bind(this);
        this.deleteStep = this.deleteStep.bind(this);
        this.updateStepList = this.updateStepList.bind(this);
        this.save = this.save.bind(this);
    }
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
                    />
                    <StepList
                        steps={this.props.selectedTestCase.steps}
                        addStep={this.addStep}
                        deleteStep={this.deleteStep}
                        updateStepList={this.updateStepList}
                    />
                    <TagList 
                        tags={this.props.selectedTestCase.tags}
                        addTag={this.addTag}
                        deleteTag={this.deleteTag}
                    />
                    </div>
                    <div className="Detail-pane-footer">
                        <button 
                            className="Save-details"
                            disabled={this.props.selectedTestCase.saving}
                            onClick={this.save}
                        >Save</button>
                    </div>
                </div>
            )            
        }
        else {
            return null
        }
    };

    addTag(newTag) {
        const isDuplicate = element => {
            return element === newTag;
        };
        let tags = 'tags';
        let updatedTagList = [...this.props.selectedTestCase.tags];
        
        // only add if it is not a duplicate
        if (!this.props.selectedTestCase.tags.some(isDuplicate)) {
            updatedTagList = [...this.props.selectedTestCase.tags, newTag];

        }
        this.updateDetails(tags, updatedTagList);
    };

    deleteTag(toDelete) {
        let tags = 'tags';
        let updatedTagList = this.props.selectedTestCase.tags.filter(
            tag => tag !== toDelete
        );

        this.updateDetails(tags, updatedTagList);
    }

    addStep(name) {
        let steps = 'steps';
        let newStep = new Step (
            this.props.selectedTestCase.steps.length,
            name
        )
        let updatedStepList = [...this.props.selectedTestCase.steps, newStep];
        this.updateDetails(steps, updatedStepList);
    }

    deleteStep(id) {
        let steps = 'steps';
        let updatedStepList = this.props.selectedTestCase.steps.filter(
            step => step.id !== id
        );

        this.updateDetails(steps, updatedStepList);
    }

    updateDescription(updatedDescription) {
        let description = 'description';

        this.updateDetails(description, updatedDescription);
    }

    updateStepList(updatedSteps) {
        let steps = 'steps';

        this.updateDetails(steps, updatedSteps);
    }

    updateDetails(updateType, update) {
            // take the current state
            let updatedTestCase = new TestCase (
                this.props.selectedTestCase.key,
                this.props.selectedTestCase.summary,
                this.props.selectedTestCase.description,
                this.props.selectedTestCase.steps,
                this.props.selectedTestCase.tags
            )
            // update the relevant field based on updateType
            updatedTestCase[updateType] = update;
            // push out the updated state
            this.props.onUpdateSelectedTestCase(updatedTestCase);
    }

    save() {
        // create new test case if this is the entryRow
        if (this.props.selectedTestCase.key === 0 &&
                this.props.selectedTestCase.summary !== '') {
            const newTestCase = this.props.selectedTestCase;
            newTestCase.key = generateKey();

            this.props.onAddTestCase(newTestCase);
        }
        else if (this.props.selectedTestCase.summary === '') {
            // do nothing
        }
        else if (this.props.selectedTestCase.key !== 0) {
            this.props.onUpdateTestCase(this.props.selectedTestCase);
        }
    }
}

const mapStateToProps = state => {    
    return {
        selectedTestCase: state.selectedTestCase,
    }
};

const mapDispatchToProps = {
    onAddTestCase: addTestCase,
    onUpdateTestCase: updateTestCase,
    onUpdateSelectedTestCase: updateSelectedTestCase
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPane);