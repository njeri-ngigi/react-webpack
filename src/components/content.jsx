import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Checkbox from './checkbox';
import NewInput from './newInput';

import '../styles/content.scss';

class Content extends Component {
  constructor () {
    super();
    this.state = {
      todos: [
        {
          done: false,
          value: 'buy milk'
        }, 
        {
          done: false,
          value: 'sell chocos'
        },
        {
          done: false,
          value: 'make a salad'
        }
      ],
      newTodo: false,
      time: new Date()
    } 
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
    this.toggleAddTodo = this.toggleAddTodo.bind(this);
    this.handleNewSaveTodo = this.handleNewSaveTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date() })
    }, 60000);
  }

  handleSaveEdit(key, value, position) {
    const { todos } = this.state;
    todos[position][key] = value;
    this.setState({ todos });
  }

  toggleAddTodo() {
    this.setState({ newTodo: !this.state.newTodo });
  }

  handleNewSaveTodo(value) {
    const todos = [...this.state.todos];
    todos.push({
      done: false,
      value
    });
    this.setState({ newTodo: false });
    this.setState({ todos });
  }

  handleDeleteTodo(position) {
    const { todos } = this.state;
    todos.splice(position, 1);
    this.setState({ todos })

  }

  getTime(time) {
    const hours = time.getHours();
    const percentage = Math.floor(hours/24*100)
    return { 
      hours: `0${hours}`.slice(-2),
      minutes: time.getMinutes(),
      percentageOfDay: percentage
    }
  }

  render() {
    const { todos, newTodo, time } = this.state;
    const { hours, minutes, percentageOfDay } = this.getTime(time);
    const display = newTodo ? 'block' : 'none';

    const todosList = todos.map((todo, index) => {
      const needs = {
        todo,
        handleSave: this.handleSaveEdit,
        handleDelete: this.handleDeleteTodo,
        position: index
      }
      return <Checkbox needs={needs} key={`todo-${index}`}/>
    });

    return (
      <div className="content">
        <div>
          <div className="content__card">
            <div>
              <h3>TODOs</h3>
              <div className="todos__list">
                { todosList }
              </div>
              <NewInput 
                key="newInput" display={display}
                saveNewTodo={this.handleNewSaveTodo} 
                cancelNewTodo={this.toggleAddTodo}/>
            </div>
            { !newTodo && 
              <span className="add__icon" onClick={this.toggleAddTodo}>
                <FontAwesomeIcon icon={faPlusCircle}/>
              </span>
            }
          </div>
        </div>
        
        <div className="percentage__of__day">
          <h1>
            <span>{percentageOfDay}</span>
            <span>%</span>
          </h1>
          <h1>
            {hours}
            <span className="pulsing__colon">:</span>
            {minutes}
          </h1>
        </div>
      </div>
    );
  } 
}
export default Content;
