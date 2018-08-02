import React, { Component } from 'react';
import { TestCaseList } from './TestCaseList';
import { DetailPane } from './DetailPane';
import { TestCase } from '../modules/TestCase';
import './Display.css'

const entryRow = new TestCase(0, '');

export class MainContainer extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        testCases: [entryRow],
        selectedTestCase: entryRow,
    };
        this.setSelectedTestCase = this.setSelectedTestCase.bind(this);
        this.processGetRequest = this.processGetRequest.bind(this);
        this.callGetTestCases = this.callGetTestCases.bind(this);
        this.createTestCase = this.createTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
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
            tc = this.state.testCases.find( (t) => { return t.id === id; });
        }
        this.setState({ selectedTestCase: tc });
    }

    addTestCase(testCase) {
        var newArray = this.state.testCases.slice();

        newArray.push(testCase);
        this.setState({ testCases: newArray })
    }    

    callGetTestCases = async () => {
        const response = await fetch('/api/testCases');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);


        await this.processGetRequest(body);
    };

    processGetRequest(response) {
        var res = JSON.parse(response.express);
        this.setState({ testCases: [] });

        res.forEach( (row) => {
            var newTestCase = new TestCase(row.id, row.summary);
            this.addTestCase(newTestCase);
        })
    }

    createTestCase = async (summary) => {
        console.log(`Creating new test case ${summary}`)
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
        console.log(`Updating row ${id} to ${summary}`);
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
        console.log(`Deleting row ${id}`);

        const response = await fetch(`/api/testCases/${id}`, {
            method: 'DELETE'
            }
        )
        this.callGetTestCases();

        if (response.status !== 200) console.log(`Delete test case ${id} failed`);
    }
}