import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    addTestCase,
    updateSelectedTestCase,
    updateTestCase
} from '../actions/testcase-actions';
import { TagList } from '../components/TagList';
import { Description } from '../components/Description'
import { TestCase } from '../modules/TestCase';
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
        this.save = this.save.bind(this);
    }
    render() {
        console.log(this.props);
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
                    <TagList 
                        tags={this.props.selectedTestCase.tags}
                        addTag={this.addTag}
                        deleteTag={this.deleteTag}
                    />
                    </div>
                    <div className="Detail-pane-footer">
                        <button 
                            className="Save-details"
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
        // TODO: add logic to prevent duplicate tags
        let tags = 'tags';
        let updatedTagList = [...this.props.selectedTestCase.tags, newTag];
        
        this.updateDetails(tags, updatedTagList);
    };

    deleteTag(toDelete) {
        let tags = 'tags';
        let updatedTagList = this.props.selectedTestCase.tags.filter(
            tag => tag !== toDelete
        );

        this.updateDetails(tags, updatedTagList);
    }

    updateDescription(updatedDescription) {
        let description = 'description';

        this.updateDetails(description, updatedDescription);
    }

    updateDetails(updateType, update) {
            // take the current state
            let updatedTestCase = new TestCase (
                this.props.selectedTestCase.key,
                this.props.selectedTestCase.summary,
                this.props.selectedTestCase.description,
                this.props.selectedTestCase.tags
            )
            // update the relevant field based on updateType
            updatedTestCase[updateType] = update;
            console.log(updatedTestCase);
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