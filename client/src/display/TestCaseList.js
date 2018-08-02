import React, { Component } from 'react';
import { DetailPane } from './DetailPane';
import { TestCaseInput } from './TestCaseInput';
import { Row } from './Row';
import './Display.css'

const entryRow = { id: 0, summary: '' }

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        response: '',
        testCasesToRender: [],
        testCases: [],
        selectedTestCase: entryRow,
        key: 0,
    };
        this.rebuildList = this.rebuildList.bind(this);
        this.setSelectedTestCase = this.setSelectedTestCase.bind(this);
        this.processGetRequest = this.processGetRequest.bind(this);
        this.getTestCases = this.getTestCases.bind(this);
        this.createTestCase = this.createTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
    }

    componentDidMount() {
        this.rebuildList();
    }

    render() {
        return(
            <div className="Main-container">
                <div className="Test-case-list-container">
                    <div>{this.state.testCasesToRender}</div>
                </div>
                <div className="Detail-pane-container">
                    <DetailPane details={this.state.selectedTestCase}/>
                </div>
            </div>
        );
    }

    rebuildList() {
        this.getTestCases ()
        .then(res => this.processGetRequest(res.express))
        .catch(err => console.log(err));
    }

    setSelectedTestCase(id) {
        let tc = entryRow;
        if(id !== 0) {
            tc = this.state.testCases.find( (t) => { return t.id === id; });
        }
        this.setState({ selectedTestCase: tc });
    }

    processGetRequest(response) {
        var res = JSON.parse(response);
        this.setState({ testCases: res, testCasesToRender: [], key: 0 });

        res.forEach( (row) => {
            this.addRowToRender(row);
        });

        this.addRowToRender(entryRow);
    }

    addRowToRender(row) {
        var newArray = this.state.testCasesToRender.slice();
        var key = this.state.key + 1;

        var newRow = (
            <Row key={key}
                testCaseId={row.id}
                deleteTestCase={this.deleteTestCase}>
                <TestCaseInput
                    testCaseId={row.id}
                    summary={row.summary}
                    createTestCase={this.createTestCase}
                    updateTestCase={this.updateTestCase}
                    deleteTestCase={this.deleteTestCase}
                    setSelectedTestCase={this.setSelectedTestCase}
                    selectedTestCaseId={this.state.selectedTestCase.id}
                />
            </Row>
        );

        newArray.push(newRow);
        this.setState({ testCasesToRender: newArray, key: key });
    }

    getTestCases = async () => {
        const response = await fetch('/api/testCases');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);

        return body;
    };    

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
        this.rebuildList();

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
        this.rebuildList();

        if (response.status !== 200) console.log(`Update test case ${id} failed`);

    }

    deleteTestCase = async (id) => {
        console.log(`Deleting row ${id}`);

        const response = await fetch(`/api/testCases/${id}`, {
            method: 'DELETE'
            }
        )
        this.rebuildList();

        if (response.status !== 200) console.log(`Delete test case ${id} failed`);
    }
}