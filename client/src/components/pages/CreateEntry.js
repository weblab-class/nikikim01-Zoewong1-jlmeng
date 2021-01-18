import React, { Component } from "react";

import EntryColors from "../modules/EntryColors.js";
import "./CreateEntry.css"
import moment from "moment";

import Dropdown from "../modules/Dropdown.js";

const months = [
  {
    id: 1,
    value: 'January',
  },{
    id: 2,
    value: 'February',
  },{
    id: 3,
    value: 'March',
  },{
    id: 4,
    value: 'April',
  },{
    id: 5,
    value: 'May',
  },{
    id: 6,
    value: 'June',
  },{
    id: 7,
    value: 'July',
  },{
    id: 8,
    value: 'August',
  },{
    id: 9,
    value: 'September',
  },{
    id: 10,
    value: 'October',
  },{
    id: 11,
    value: 'November',
  },{
    id: 12,
    value: 'December',
  },
]

const days = []

const years = []

const journals = [
  {
    id: 1,
    value: 'School Journal',
  },{
    id: 2,
    value: 'Work Journal',
  }
]



class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment(),
    };
  }

  componentDidMount() {
    document.title = "Create a New Entry";
  }

  




  render() {
    let day = this.state.today.format('D');
    let month = this.state.today.format('MMMM');
    let year = this.state.today.format('YYYY')
    return (
    <>
    <div className = "CreateEntry-date">
      <Dropdown title="Month" items={months}/>
      <Dropdown title="Day" items={days}/>
      <Dropdown title="Year" items={years}/>
    </div>
        
      <Dropdown className = "CreateEntry-journalChoice" title='Journal' items={journals}/>

    <EntryColors/>
    </>
    )
  }
}

export default CreateEntry;
