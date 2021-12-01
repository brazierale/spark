import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

type MoveTestCaseProps = {
  testCaseKey: string;
  disabled: Boolean;
  setDragEnabledStatus: (status: boolean) => void;
}

// icon to reorder test case, currently only visual
const MoveTestCase = ({ testCaseKey, disabled, setDragEnabledStatus }: MoveTestCaseProps) => {
  if (testCaseKey !== 'blank' && disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='move-row'
        className="Move-row"
        icon={faArrowsAlt}
        size="sm"
        onMouseDown={() => enableMove(setDragEnabledStatus)}
        onMouseLeave={() => disableMove(setDragEnabledStatus)}
      />
    );
  }
  else {
    return null;
  }
};

const enableMove = (setDragEnabledStatus: (status: boolean) => void)  => {
  setDragEnabledStatus(true);
};

const disableMove = (setDragEnabledStatus: (status: boolean) => void) => {
  setDragEnabledStatus(false);
};

export default MoveTestCase;
