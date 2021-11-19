import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

// icon to reorder test case, currently only visual
const MoveTestCase = props => {
  if (props.testCaseKey !== 0 && props.disabled !== true) {
    return (
      <FontAwesomeIcon
        data-testid='move-row'
        className="Move-row"
        icon={faArrowsAlt}
        size="sm"
        onMouseDown={() => enableMove(props)}
        onMouseLeave={() => disableMove(props)}
      />
    );
  }
  else {
    return null;
  }
};

const enableMove = props => {
  props.setDragEnabledStatus(true);
};

const disableMove = props => {
  props.setDragEnabledStatus(false);
};

MoveTestCase.propTypes = {
  testCaseKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  disabled: PropTypes.bool.isRequired,
  setDragEnabledStatus: PropTypes.func.isRequired
};

export default MoveTestCase;
