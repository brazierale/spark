import React, { Component } from 'react';
import { DisplayInput } from './DisplayInput';
import { DetailPane } from './DetailPane';
import { TestCaseInput } from './TestCaseInput';
import { Row } from './Row';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        response: '',
        testCasesToRender: [],
        testCases: [],
        selectedTestCase: false,
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
        console.log(`Rendering with selected test case`);
        console.log(this.state.selectedTestCase)
        return(
            <div className="Main-container">
                <div className="Test-case-list-container">
                    <div>{this.state.testCasesToRender}</div>
                    <DisplayInput createTestCase={this.createTestCase}/>
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
        let tc = this.state.testCases.find( (t) => { return t.id === id; });
        this.setState({ selectedTestCase: tc });
    }

    processGetRequest(response) {
        var res = JSON.parse(response);
        var key = 0;
        this.setState({ testCases: res });
        this.setState({ testCasesToRender: [] });

        res.forEach( (row) => {
            var newArray = this.state.testCasesToRender.slice();

            var newRow = (
                <Row key={key}
                    testCaseId={row.id}
                    deleteTestCase={this.deleteTestCase}>
                    <TestCaseInput
                        testCaseId={row.id}
                        summary={row.summary}
                        updateTestCase={this.updateTestCase}
                        deleteTestCase={this.deleteTestCase}
                        setSelectedTestCase={this.setSelectedTestCase}
                    />
                </Row>
            );

            newArray.push(newRow);
            key++;
            this.setState({ testCasesToRender: newArray });
        });
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