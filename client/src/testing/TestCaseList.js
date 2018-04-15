import React, { Component } from 'react';

export class TestCaseList extends Component {
    state = {
        response: ''
    };


    componentDidMount() {
        this.callApi ()
        .then(res => this.setState({ response: res.express }))
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
            <div>Current test cases: {this.state.response}</div>
        );
    }
}