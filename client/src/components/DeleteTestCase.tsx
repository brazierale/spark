import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type DeleteTestCaseProps = {
  testCaseKey: string;
  disabled: boolean;
  deleteTestCase: undefined
}

// x button to delete a test case
const DeleteTestCase = ({ testCaseKey, disabled, deleteTestCase }: DeleteTestCaseProps ) => {
  if (testCaseKey !== 'blank' && disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='test-case-delete'
        className="Delete-row"
        icon={faTimes}
        onClick={deleteTestCase}
      />
    );
  }
  else {
    return null;
  }
};

export default DeleteTestCase;
