import React, { Component } from 'react';
import { TestCaseList } from './TestCaseList';
import { DetailPane } from './DetailPane';
import { TestCase } from '../modules/TestCase';
import './Display.css'

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
        //remove the entry row first as it needs to remain at the end
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
        const response = await fetch('/api/testCases');
        const body = await response.json();
        let testCases = [];
        
        if (response.status !== 200) throw Error(body.message);

        if (body.express.length > 0) {
            const express = JSON.parse(body.express);
            testCases = express.map((testCase) => new TestCase(testCase.id, testCase.summary));
        }
        testCases.push(entryRow);

        this.setState({ testCases: testCases });
    };

    createTestCase = async (summary) => {
        console.log(`Creating new test case ${summary}`)
        let nextId = this.state.testCases[this.state.testCases.length-2].id + 1;
        let mockTestCase = new TestCase(nextId, summary);
        this.addTestCase(mockTestCase);
        var toSend = JSON.stringify({summary: summary});

        const response = await fetch('/api/testCases', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: toSend
        })
        this.callGetTestCases();

        if (response.status !== 200) console.log(`Create test case ${summary} failed`);
    }

    updateTestCase = async (id, summary) => {
        console.log(`Updating test case ${id} to ${summary}`);
        this.editTestCaseSummary(id, summary);
        var toSend = JSON.stringify({summary: summary});
        
        const response = await fetch(`/api/testCases/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: toSend
        })
        this.callGetTestCases();

        if (response.status !== 200) console.log(`Update test case ${id} failed`);

    }

    deleteTestCase = async (id) => {
        console.log(`Deleting test case ${id}`);
        let mockTestCase = this.state.testCases.find( (t) => { return t.id === id });
        this.removeTestCase(mockTestCase);
        
        const response = await fetch(`/api/testCases/${id}`, {
            method: 'DELETE'
            }
        )
        this.callGetTestCases();

        if (response.status !== 200) console.log(`Delete test case ${id} failed`);
    }
}