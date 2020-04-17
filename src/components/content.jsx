import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPencilAlt, faPen } from '@fortawesome/free-solid-svg-icons';

import '../styles/content.scss';

class Content extends Component {
  constructor () {
    super();
    this.state = {
      todos: `- Buy Milk \n- Do Home work`,
      edit: false,
      textareaValue: '',
      textChanged: false
    } 
    this.editTodos = this.editTodos.bind(this);
    this.saveTodos = this.saveTodos.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  editTodos() {
    this.setState({ edit: true });
  }

  handleEdit(event) {
    const { value } = event.target;
    this.setState({ 
      textareaValue: value,
      textChanged: true
    });
    console.log('Calling????????')
  }

  saveTodos() {
    const { textareaValue, textChanged } = this.state
    if (textChanged) {
      this.setState({todos: textareaValue});
    } 
    this.setState({ edit: false }) 
  }

  render() {
    return (
      <div className="content">
        <div className="content__card">
          <h3>TODOs</h3>
          { 
            this.state.edit === false && 
            <div>
              <p>
                {this.state.todos}
              </p>
              <span className="addTodos" onClick={this.editTodos}>
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </span>
            </div> 
          }
          { 
            this.state.edit === true && 
            <form>
              <textarea value={this.state.todos} onChange={this.handleEdit}></textarea>
              <button onClick={this.saveTodos}>Save</button>
            </form>
          }
        </div>
      </div>
    )
  } 
}
export default Content;
