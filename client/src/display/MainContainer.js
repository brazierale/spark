import React, { Component } from 'react';
import { TestCaseList } from './TestCaseList';
import { DetailPane } from './DetailPane';
import { TestCase } from '../modules/TestCase';
import axios from "axios";
import './Display.css'

// the final row should always be the entryRow which is a placeholder test case to be edited
var entryRow = new TestCase(0, '');

export class MainContainer extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        testCases: [],
        selectedTestCase: entryRow,
    };
        this.setSelectedTestCase = this.setSelectedTestCase.bind(this);
        this.callGetTestCases = this.callGetTestCases.bind(this);
        this.createTestCase = this.createTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.editTestCaseSummary = this.editTestCaseSummary.bind(this);
    }

    componentDidMount() {
        this.callGetTestCases();
    }

    render() {
        return(
            <div className="Main-container">
                <div className="Test-case-list-container">
                    <TestCaseList
                        testCases={this.state.testCases}
                        createTestCase={this.createTestCase}
                        updateTestCase={this.updateTestCase}
                        deleteTestCase={this.deleteTestCase}
                        setSelectedTestCase={this.setSelectedTestCase}
                        selectedTestCase={this.state.selectedTestCase}
                    />
                </div>
                <div className="Detail-pane-container">
                    <DetailPane selectedTestCase={this.state.selectedTestCase} />
                </div>
            </div>
        );
    }

    setSelectedTestCase(id) {
        let tc = entryRow;
        if(id !== 0) {
            tc = this.state.testCases.find( (t) => { return t.id === id });
        }
        this.setState({ selectedTestCase: tc });
    }

    addTestCase(testCase) {
        //remove the entry row first as it needs to remain at the end, then add it back at the end
        let newArray = this.state.testCases.slice(0, this.state.testCases.length - 1);
        newArray.push(testCase);
        newArray.push(entryRow);
        
        this.setState({ testCases: newArray });
    }

    removeTestCase(testCase) {
        let newArray = this.state.testCases.filter(tc => tc !== testCase);
        this.setState({ testCases: newArray });
    }

    editTestCaseSummary(id, summary) {
        let newArray = this.state.testCases;
        let index = newArray.findIndex( (t) => { return t.id === id });

        newArray[index].summary = summary;
        this.setState({ testCases: newArray });
    }

    callGetTestCases = async () => {
        let testCases = [];

        axios.get("/api/testCases")
            .then(res => {
                if (res.data.data.length > 0) {
                    testCases = res.data.data.map((testCase) => new TestCase(testCase.id, testCase.summary));
                }
                testCases.push(entryRow);

                this.setState({ testCases: testCases })
            })
    }

    createTestCase = async (summary) => {
        console.log(`Creating new test case ${summary}`)
        //default to 1 for when there are no test cases
        let nextId = 1;
        if (this.state.testCases.length >1) { nextId = this.state.testCases[this.state.testCases.length-2].id + 1; }
        
        //create mock test case so UI is immediately updated
        let mockTestCase = new TestCase(nextId, summary);
        this.addTestCase(mockTestCase);
        
        axios.post("/api/testCases", {
            id: nextId,
            summary: summary
        })
        .then(res => {
            this.callGetTestCases();
        })
        .catch(err => console.log(err));
    }

    updateTestCase = async (id, summary) => {
        console.log(`Updating test case ${id} to ${summary}`);
        // mock the edit so UI is immediately updated
        this.editTestCaseSummary(id, summary);

        axios.put(`/api/testCases/${id}`, {
            update: {summary: summary}
        })
        .then(res => {
            this.callGetTestCases();
        })
        .catch(err => console.log(err));
    }

    deleteTestCase = async (id) => {
        console.log(`Deleting test case ${id}`);
        // mock the deletion so UI is immediately updated
        let mockTestCase = this.state.testCases.find( t => { return t.id === id });
        this.removeTestCase(mockTestCase);

        axios.delete(`/api/testCases/${id}`)
            .then(res => {
                this.callGetTestCases();
            })
            .catch(err => console.log(err));
    }
}