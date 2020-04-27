import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class NewInput extends Component {
  constructor() { 
    super(); 
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      inputTextValue: ''
    }
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ inputTextValue: value });
  }

  handleSave() {
    const { saveNewTodo } = this.props;
    const { inputTextValue } = this.state;
    saveNewTodo(inputTextValue);
    this.setState({ inputTextValue: '' });
  }

  handleCancel() {
    const { cancelNewTodo } = this.props;
    cancelNewTodo();
    this.setState({ inputTextValue: '' });
  }

  render() {
    const { inputTextValue } = this.state;
    const { display } = this.props;
    
    const cancelIcon = 
      <button onClick={this.handleCancel} title="cancel">
        <FontAwesomeIcon icon={faTimesCircle}/>
      </button>;
  
    const saveIcon = 
      <button onClick={this.handleSave} title="create">
        <FontAwesomeIcon icon={faCheckCircle}/>
      </button>;

    const buttonIcon = inputTextValue.length > 0 ? saveIcon : cancelIcon;

    return (
      <div className="new__input" style={{ display }}>
        <input value={inputTextValue} type="text" onChange={this.handleChange}/>
        { buttonIcon }
      </div>
    );
  }
}

export default NewInput;
