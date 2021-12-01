import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type DeleteTagProps = {
  disabled: boolean;
  deleteTag: () => void;
};

const Classes = ( disabled: boolean ) => classNames({
  'Delete-tag': true,
  'Disabled-delete': disabled,
});

// delete button for a single tag
const DeleteTag = ({ disabled, deleteTag }: DeleteTagProps ) => (
  <FontAwesomeIcon
    data-testid="tag-delete"
    className={Classes(disabled)}
    icon={faTimes}
    onClick={() => deleteTag} />
);

export default DeleteTag;
