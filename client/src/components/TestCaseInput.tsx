import React, { Component } from 'react';
import classNames from 'classnames';
import { TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';

interface TestCaseInputProps {
  testCase: TestCaseObject;
  selectedTestCase: TestCaseObject;
  isSelected: Boolean;
  addTestCase: (newTestCase: TestCaseObject) => void;
  deleteTestCaseByKey: (key: string) => void;
  setSelectedTestCaseByKey: (key: string) => void;
  updateTestCase: (updatedTestCase: TestCaseObject) => void;
  updateSelectedTestCaseSummary: (summary: string) => void;
  nextSortId: () => number;
};

class TestCaseInput extends Component<TestCaseInputProps> {
  render() {
    let classes = classNames({
      'Test-case': true,
      'Test-case-input': true,
      'Selected-input': this.props.isSelected,
      'Test-case-disabled': this.props.testCase.disabled
    });

    // this ensures the field remains editable and is not overwritten by the saved state
    let summary = this.props.testCase.summary;
    if (this.props.isSelected) {
      summary = this.props.selectedTestCase.summary;
    }

    return (
      <textarea
        data-testid="test-case-input"
        rows={1}
        wrap="off"
        maxLength={255}
        placeholder="Enter your test case here..."
        className={classes}
        value={summary}
        onChange={this.handleUserInput}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        disabled={this.props.testCase.disabled}
      />
    );
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateSelectedTestCaseSummary(event.target.value);
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.sendUpdate(this.props.selectedTestCase.summary);
    }
  }
    
  handleFocus = () => {
    if (this.props.selectedTestCase.key !== this.props.testCase.key) {
      this.props.setSelectedTestCaseByKey(this.props.testCase.key);
    }
  }

  sendUpdate = ( summary: string ) => {
    // create new test case if this is the entryRow
    if(this.props.testCase.key === 'blank' && summary !== '') {
      let newTestCase = this.props.testCase;
      newTestCase.key = generateKey();
      newTestCase.sortId = this.props.nextSortId();
      newTestCase.summary = summary;

      this.props.addTestCase(newTestCase);

      this.props.setSelectedTestCaseByKey('blank');
    }
    // delete the test case if it is empty
    else if (summary === '' && this.props.testCase.key !== 'blank') {
      this.props.setSelectedTestCaseByKey('blank');
      this.props.deleteTestCaseByKey(this.props.testCase.key);
    }
    // otherwise, update the test case
    else if (this.props.testCase.key !== 'blank') {
      let updatedTestCase = new TestCaseObject(
        this.props.testCase.key,
        this.props.testCase.sortId,
        summary,
        this.props.testCase.description,
        this.props.testCase.steps,
        this.props.testCase.tags
      );
      this.props.updateTestCase(updatedTestCase);
    }
  }
}

export default TestCaseInput;
