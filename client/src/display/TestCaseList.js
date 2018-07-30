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

        this.processResponse = this.processResponse.bind(this);
        this.rebuildList = this.rebuildList.bind(this);
        this.deleteTestCase = this.deleteTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.createTestCase = this.createTestCase.bind(this);
    }

    componentDidMount() {
        this.rebuildList();
    }

    rebuildList() {
        this.callApi ()
        .then(res => this.processResponse(res.express))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/testCases');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return(
            <div className="Test-cases">
                <div>{this.state.testCases}</div>
                <DisplayInput createTestCase={this.createTestCase}/>
            </div>
        );
    }

    processResponse(response) {
        var res = JSON.parse(response);
        var key = 0;
        this.setState({ testCases: [] });

        res.forEach( row => {
            var newArray = this.state.testCases.slice();
            var newRow = (
                <Row key={key} testCaseId={row.Id} deleteTestCase={this.deleteTestCase}>
                    <TestCase
                        testCaseId={row.Id}
                        summary={row.Summary}
                        deleteTestCase={this.deleteTestCase}
                        updateTestCase={this.updateTestCase}
                    />
                </Row>
            );

            newArray.push(newRow);
            key++;
            this.setState({ testCases: newArray });
        });
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
}