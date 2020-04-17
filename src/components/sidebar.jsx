import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faToolbox, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    const date = new Date();
    const today = date.getDate();
    this.state = {
      today,
      currentDate: today
    }
    this.getDates = this.getDates.bind(this);
    this.getOtherDay = this.getOtherDay.bind(this);
  }

  getOtherDay(day) {
    const date = new Date();
    date.setDate(day);
    return `0${date.getDate()}`.slice(-2);
  }

  getDates(day) {
    const date = new Date();
    date.setDate(day);
    const month = date.toLocaleString('default', { month: 'long' })
    const today = date.getDate();
    const todayString = date.toLocaleString('default', { weekday: 'short' })
    const yesterday = this.getOtherDay(today - 1);
    const tomorrow = this.getOtherDay(today + 1);
    const dayAfterTomorrow = this.getOtherDay(today + 2);
  
    return {
      month, todayString, yesterday, tomorrow, dayAfterTomorrow
    }
  }

  changeDate(day) {
    this.setState({ today: day })
  }

  render() {
    const { today, currentDate } = this.state;
    const { 
      month, todayString, yesterday, tomorrow, dayAfterTomorrow
    } = this.getDates(today);
  
    return (
      <div className="sidebar">
        <div className="sidebar__contianer">
          <span className="month">{month.toLocaleUpperCase()}</span>
          <span className="date" onClick={()=>this.changeDate(yesterday)}>{yesterday}</span>
          <span className="today">
            <sub className="today__dash">{todayString}</sub>
            <span>{today}</span>
          </span>
          <span className="date" onClick={()=>this.changeDate(tomorrow)}>{tomorrow}</span>
          <span className="date" onClick={()=>this.changeDate(dayAfterTomorrow)}>{dayAfterTomorrow}</span>
          {currentDate !== today && <span className="see-today" onClick={()=>this.changeDate(currentDate)}>SEE TODAY</span>}
        </div>
      </div>
    );
  }
}

export default Sidebar;