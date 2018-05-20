import React, { Component } from 'react';
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
    }

    componentDidMount() {
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
        console.log('current state: ' + this.state.testCases);
        return(
            <div className="Test-cases">
                <div>{this.state.testCases}</div>
            </div>
        );
    }

    processResponse(response) {
        var res = JSON.parse(response);

        res.forEach( row => {
            var newArray = this.state.testCases.slice();
            var newRow = (
                <Row key={row.Id}>
                    <TestCase summary={row.Summary}/>
                </Row>
            );

            newArray.push(newRow);
            this.setState({ testCases: newArray });
        });
    }
}