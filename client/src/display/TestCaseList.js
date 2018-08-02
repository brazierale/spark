import React, { Component } from 'react';
import { Row } from './Row';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        testCases: [],
        testCasesToRender: [],
        key: 0,
    };
        this.rebuildList = this.rebuildList.bind(this);
    }

    componentWillReceiveProps () {
        //console.log(this.props.testCases);
        this.rebuildList();
    }

    render() {
        //console.log(`rendering...`);
        //console.log(this.props.testCases);
        //console.log(this.state.testCasesToRender);
        return(
                <div>{this.state.testCasesToRender}</div>
        );
    }

    rebuildList() {
        this.setState({ testCasesToRender: [], key: 0 })
        let toBuild = this.props.testCases
        console.log(`to build...`);
        console.log(this.props.testCases);
        toBuild.forEach( (testCase) => {
            //console.log(`Adding row to render...`)
            //console.log(testCase);
            this.addRowToRender(testCase);
        });
    }

    addRowToRender(row) {
        var newArray = this.state.testCasesToRender.slice();
        var key = this.state.key + 1;

        var newRow = (
            <Row key={key}
                testCaseId={row.id}
                testCaseSummary={row.summary}
                createTestCase={this.props.createTestCase}
                updateTestCase={this.props.updateTestCase}
                deleteTestCase={this.props.deleteTestCase}
                setSelectedTestCase={this.props.setSelectedTestCase}
                selectedTestCaseId={this.props.selectedTestCase.id}>
            </Row>
        );

        newArray.push(newRow);
        //console.log(`setting state to...`);
        //console.log(newArray);
        this.setState({ testCasesToRender: newArray, key: key });
    }
}