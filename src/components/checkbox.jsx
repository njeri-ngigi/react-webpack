import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

import '../styles/checkbox.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    const { todo: { value, done } } = this.props.needs;

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.handleClick = this.toggleEdit.bind(this);
    this.handleSaveText = this.handleSaveText.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  
    this.state = {
      inputTextValue: value,
      oldInputValue: value,
      checked: done,
      edit: false,
      hover: false
    }
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ inputTextValue: value });
  }

  toggleEdit(cancel=false) {
    this.setState({ edit: !this.state.edit });
    if (cancel) {
      this.setState({ inputTextValue: this.state.oldInputValue});
    }
  }

  handleChecked() {
    const { handleSave, position } = this.props.needs;
    const { checked } = this.state;
    handleSave('done', !checked, position);
    this.setState({ checked: !checked });
  }

  handleSaveText() {
    const { handleSave, position } = this.props.needs;
    const { inputTextValue } = this.state;

    this.setState({ edit: false });
    this.setState({ oldInputValue: this.state.inputTextValue });

    handleSave('value', inputTextValue, position);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const { edit, inputTextValue, checked, hover } = this.state;
    const { handleDelete, position } = this.props.needs;

    const inputCheckbox = 
      <div className="input" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <input type="checkbox" checked={checked} onChange={this.handleChecked}/>
        <span onClick={this.toggleEdit} className="span__input">{inputTextValue}</span>
        <span className="delete__btn" style={{ display: hover ? 'inline-block' : 'none' }} onClick={() => handleDelete(position)}>
          <FontAwesomeIcon icon={faTrash}/>
        </span>
      </div>;

    const inputText = 
      <div className="input">
        <input type="text" value={inputTextValue} onChange={this.handleChange}/>
        <button onClick={this.handleSaveText} title="Save" className="button__icon">
          <FontAwesomeIcon icon={faCheckCircle}/>
        </button>
        <button onClick={() => this.toggleEdit(true)} title="Cancel">
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      </div>;
    
    const input = edit ? inputText : inputCheckbox;

    return input;
  }
}

export default Checkbox;
