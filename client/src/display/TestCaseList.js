import React, { Component } from 'react';
import { DisplayInput } from './DisplayInput';
import { TestCase } from './TestCase';
import { Row } from './Row';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        response: '',
        testCases: [],
    };
        this.rebuildList = this.rebuildList.bind(this);
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
            <div className="Test-cases">
                <div>{this.state.testCases}</div>
                <DisplayInput createTestCase={this.createTestCase}/>
            </div>
        );
    }

    rebuildList() {
        this.getTestCases ()
        .then(res => this.processGetRequest(res.express))
        .catch(err => console.log(err));
    }

    processGetRequest(response) {
        var res = JSON.parse(response);
        var key = 0;
        this.setState({ testCases: [] });

        res.forEach( row => {
            var newArray = this.state.testCases.slice();
            var newRow = (
                <Row key={key}
                    testCaseId={row.Id}
                    deleteTestCase={this.deleteTestCase}>
                    <TestCase
                        testCaseId={row.Id}
                        summary={row.Summary}
                        updateTestCase={this.updateTestCase}
                        deleteTestCase={this.deleteTestCase}                       
                    />
                </Row>
            );

            newArray.push(newRow);
            key++;
            this.setState({ testCases: newArray });
        });
    }

    getTestCases = async () => {
        const response = await fetch('/api/testCases');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);

        return body;
    };    

    createTestCase(summary) {
        console.log(`Creating new test case ${summary}`)
        var toSend = JSON.stringify({summary: summary});

        (async () => {
            const response = await fetch('/api/testCases', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: toSend
            })
            this.rebuildList();
        })();
    }

    updateTestCase(id, summary) {
        console.log(`Updating row ${id} to ${summary}`);
        var toSend = JSON.stringify({summary: summary});
        
        (async () => {
            const response = await fetch(`/api/testCases/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: toSend
            })
            this.rebuildList();
        })();
    }

    deleteTestCase(id) {
        console.log(`Deleting row ${id}`);
        (async () => {
            const response = await fetch(`/api/testCases/${id}`, {
                method: 'DELETE'
                }
            )
            this.rebuildList();
        })();
    }
}