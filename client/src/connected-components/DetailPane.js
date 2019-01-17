import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    addTestCase,
    updateSelectedTestCase,
    updateTestCase
} from '../actions/testcase-actions';
import { TagList } from '../components/TagList';
import { TestCase } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import '../support/DetailPane.css'

// right-hand pane displaying details of selected test case
class DetailPane extends Component {
    constructor(props) {
        super(props);

        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
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

    addTag(tag) {
        let updatedTagList = [...this.props.selectedTestCase.tags, tag];
        let updatedTestCase = new TestCase (this.props.selectedTestCase.key, this.props.selectedTestCase.summary, updatedTagList);
        this.props.onUpdateSelectedTestCase(updatedTestCase);
    };

    deleteTag(toDelete) {
        let updatedTagList = this.props.selectedTestCase.tags.filter(
            tag => tag !== toDelete
        );
        let updatedTestCase = new TestCase (this.props.selectedTestCase.key, this.props.selectedTestCase.summary, updatedTagList);
        this.props.onUpdateSelectedTestCase(updatedTestCase);
    }

    save() {
        if (this.props.selectedTestCase.key === 0 && this.props.selectedTestCase.summary !== '') {
            const newTestCase = this.props.selectedTestCase;
            newTestCase.key = generateKey();

            this.props.onAddTestCase(newTestCase);
        }
        else if (this.props.selectedTestCase.summary === '') {
            // do nothing
        }
        else if (this.props.testCaseKey !== 0) {
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