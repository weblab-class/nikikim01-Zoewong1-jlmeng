import React, { Component } from "react";

import EntryColors from "../modules/EntryColors.js";
import "./CreateEntry.css";
import "../modules/Dropdown.css";
import moment from "moment";

import TitleForm from "../modules/TitleForm.js";
import EnterEntry from "../modules/EnterEntry.js";
import plusSign from "../../public/images/plusSign.svg";
import lockButton from "../../public/images/lockButton.svg";
import shareButton from "../../public/images/shareButton.svg";
import Webcam from "react-webcam";
import MonthsDropdown from "../modules/MonthsDropdown.js";
import DaysDropdown from "../modules/DaysDropdown.js";
import YearsDropdown from "../modules/YearsDropdown.js";
import JournalsDropdown from "../modules/JournalsDropdown.js";
import WebcamCapture from "../modules/WebcamCapture.js";

const months = [
  {
    id: "Month1",
    value: 'January',
  },{
    id: "Month2",
    value: 'February',
  },{
    id: "Month3",
    value: 'March',
  },{
    id: "Month4",
    value: 'April',
  },{
    id: "Month5",
    value: 'May',
  },{
    id: "Month6",
    value: 'June',
  },{
    id: "Month7",
    value: 'July',
  },{
    id: "Month8",
    value: 'August',
  },{
    id: "Month9",
    value: 'September',
  },{
    id: "Month10",
    value: 'October',
  },{
    id: "Month11",
    value: 'November',
  },{
    id: "Month12",
    value: 'December',
  },
];

const days = [
  {
    id: "Day1",
    value: 1,
  },{
    id: "Day2",
    value: 2,
  },{
    id: "Day3",
    value: 3,
  },{
    id: "Day4",
    value: 4,
  },{
    id: "Day5",
    value: 5,
  },{
    id: "Day6",
    value: 6,
  },{
    id: "Day7",
    value: 7,
  },{
    id: "Day8",
    value: 8,
  },{
    id: "Day9",
    value: 9,
  },{
    id: "Day10",
    value: 10,
  },{
    id: "Day11",
    value: 11,
  },{
    id: "Day12",
    value: 12,
  },{
    id: "Day13",
    value: 13,
  },{
    id: "Day14",
    value: 14,
  },{
    id: "Day15",
    value: 15,
  },{
    id: "Day16",
    value: 16,
  },{
    id: "Day17",
    value: 17,
  },{
    id: "Day18",
    value: 18,
  },{
    id: "Day19",
    value: 19,
  },{
    id: "Day20",
    value: 20,
  },{
    id: "Day21",
    value: 21,
  },{
    id: "Day22",
    value: 22,
  },{
    id: "Day23",
    value: 23,
  },{
    id: "Day24",
    value: 24,
  },{
    id: "Day25",
    value: 25,
  },{
    id: "Day26",
    value: 26,
  },{
    id: "Day27",
    value: 27,
  },{
    id: "Day28",
    value: 28,
  },{
    id: "Day29",
    value: 29,
  },{
    id: "Day30",
    value: 30,
  },{
    id: "Day31",
    value: 31,
  }
];

const thisYear = new Date().getFullYear();

let years = new Array();
for (let i = 0; i<120; i++) {
  let yr = thisYear-120+i+1;
  let tempDict = {id: yr, value: yr};
  years.push(tempDict);
}

const journals = [
  {
    id: 'Journal1',
    value: 'School Journal',
  },{
    id: 'Journal2',
    value: 'Work Journal',
  }
];

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment(),
      saved: false, 
    };
  }

  componentDidMount() {
    document.title = "Create a New Entry";
  }

  componentDidUpdate(){
    if (this.state.saved){
      console.log("Create Entry toggle");
      this.setState({
        saved:false,
      });
    }
  }

  render() {
    let day = this.state.today.format('D');
    let month = this.state.today.format('MMMM');
    let year = this.state.today.format('YYYY')

    if (this.state.saved){
        alert("Congratulations!");
    }
    
    return (
    <>
    
    <div className="CreateEntry-wrapper">
      <div className="CreateEntry-inputSection">
        <div className = "CreateEntry-date">
          <MonthsDropdown/>
          <DaysDropdown/>
          <YearsDropdown/>
        </div>
        <JournalsDropdown />
          
          <TitleForm saved={this.state.saved}/>
          <EnterEntry saved={this.state.saved}/>
        <EntryColors saved={this.state.saved}/>

      </div>
      <div className="CreateEntry-monitorSection">

        <div className="CreateEntry-heart"></div>

       <div><WebcamCapture /></div>

        <div className="u-flexRow u-justifyCenter">
          <button className="u-flex u-flex-justifyCenter u-flex-alignCenter CreateEntry-button">
            <img src={plusSign} width="48.51px" height="48.51px"></img>
          </button>
          <button className="u-flex u-flex-justifyCenter u-flex-alignCenter CreateEntry-button">
            <img src={lockButton} width="51.49px" height="51.49px"></img>
            </button>
          <button className="u-flex u-flex-justifyCenter u-flex-alignCenter CreateEntry-button">
            <img src={shareButton} width="59px" height="59px"></img>
            </button>
        </div>

        <button className="CreateEntry-saveButton" onClick={() => {
            this.setState({
              saved:true})}
          }>
          <div className="CreateEntry-saveHeart"></div>
          <p className="CreateEntry-saveText">Save</p>
          <div className="CreateEntry-saveHeart"></div>
        </button>

      </div>
    </div>
    </>
    );
  }
}

export default CreateEntry;
