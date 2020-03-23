import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ name: value })
  }

  render() {
    return (
      <form>
        <input placeholder="Your name?" type="text" onChange={this.handleChange}/>
        <p>{this.state.name}</p>
      </form>
    )
  }
}

export default Form;
