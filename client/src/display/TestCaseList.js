import React, { Component } from 'react';
import { Row } from './Row';

export class TestCaseList extends Component {
    constructor(props) {
        super(props);
        
    this.state = {
        testCases: this.props.testCases,
        testCasesToRender: [],
        key: 0,
    };
        this.rebuildList = this.rebuildList.bind(this);
    }

    componentDidMount() {
        this.rebuildList();
    }

    render() {
        return(
                <div>{this.state.testCasesToRender}</div>
        );
    }

    rebuildList = async () => {
        this.setState({ testCasesToRender: [], key: 0 })
        let toBuild = this.state.testCases
        console.log(`to build...`);
        console.log(this.state.testCases);
        toBuild.forEach( (testCase) => {
            this.addRowToRender(testCase);
        });
    }

    addRowToRender(row) {
        console.log(`adding row...`)
        console.log(row);
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
        this.setState({ testCasesToRender: newArray, key: key });
    }
}