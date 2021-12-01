import React from 'react';
import DeleteTag from './DeleteTag';

type TagProps = {
  tagName: string;
  disabled: boolean;
  deleteTag: () => void;
};

// single tag which will in future act as a link to filtering
const Tag = ( {tagName, disabled, deleteTag}: TagProps ) => {
  return (
    <span data-testid="tag" className="Tag">
      {tagName}
      <DeleteTag
        disabled={disabled}
        deleteTag={deleteTag} />
    </span>
  );
};

export default Tag;
