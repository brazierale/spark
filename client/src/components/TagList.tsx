import React, { Component } from 'react';
import classNames from 'classnames';
import Tag from './Tag';
import '../styles/Tag.css';

interface TagListProps {
  tags: string[];
  disabled: boolean;
  addTag: (newTag: string) => void;
  deleteTag: (toDelete: string) => void;
};

// list of tags
class TagList extends Component<TagListProps> {
  state = {
    newTag: ''
  }

  render() {
    let key = 0;
    const tagsToRender = this.props.tags.map( tag => 
      <Tag
        key={key++} 
        tagName={tag}
        deleteTag={() => this.props.deleteTag(tag)}
        disabled={this.props.disabled}
      />
    );

    let listClasses = classNames({
      'Tag-list': true,
      'Disabled': this.props.disabled
    });

    return(
      <div data-testid="tag-list" className="Tag-list-container">
        <span className="Label">Tags</span>
        <span className={listClasses}>
          {tagsToRender}
          <textarea
            data-testid="tag-new"
            className="Tag-input"
            rows={1}
            wrap="off"
            placeholder="Enter new tag..."
            value={this.state.newTag}
            onChange={this.handleUserInput}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            disabled={this.props.disabled}
          />
        </span>
      </div>
    );
  }

  handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newTag: event.target.value});
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.props.addTag(this.state.newTag);
      this.setState({ newTag: '' });
    }
  }

  handleBlur = () => {
    this.setState({ newTag: '' });
  }
}

export default TagList;
