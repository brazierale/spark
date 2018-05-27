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
                <DisplayInput rebuildList={this.rebuildList}/>
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
                <Row key={key} id={row.Id} rebuildList={this.rebuildList}>
                    <TestCase summary={row.Summary}/>
                </Row>
            );

            newArray.push(newRow);
            key++;
            this.setState({ testCases: newArray });
        });
    }
}