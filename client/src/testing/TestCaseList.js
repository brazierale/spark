import React, { Component } from 'react';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        response: '',
        testCases: [],
    };

        this.processData = this.processData.bind(this);
    }

    componentDidMount() {
        this.callApi ()
        .then(res => this.processData(res.express))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/getTestCases');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return(
            <div>{this.state.testCases}</div>
        );
    }

    processData(response) {
        console.log('response to process: ' + response);
        response.forEach( row => {
            var newArray = this.state.testCases.slice();
            console.log('row: ' + row);
            newArray.push(<div>Id: {row.Id}, Text: {row.Summary}</div>);

            this.setState({ testCases: newArray });
        });
    }
}