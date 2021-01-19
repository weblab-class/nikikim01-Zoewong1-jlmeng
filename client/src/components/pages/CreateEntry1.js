import React, { Component } from "react";

import EntryColors from "../modules/EntryColors.js";
import "./CreateEntry1.css";
import "../modules/Dropdown.css";
import moment from "moment";

import {post} from "../../utilities.js"
import Circle from "../modules/Circle.js";
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

import mic from "../../public/images/mic.svg";

const numOfYears = 120;
const thisYear = new Date().getFullYear();

let yearList = new Array();
for (let i = numOfYears; i>0; i--) {
  let yr = thisYear-120+i;
  yearList.push(yr.toString());
}

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayList = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
const journalList = ['School Journal','Work Journal'];
const colorList = ["#B8D4FF", "#B9D99C", "#CAB8FF", "#D99C9C","#F5CCEA", "#F9D142", "#F8E963"];

const months = monthList.map((month) => (<option value={month}>{month}</option>));
const days = dayList.map((day) => (<option value={day}>{day}</option>));
const years = yearList.map((year) => (<option value={year}>{year}</option>));
const journals = journalList.map((journal) => (<option value={journal}>{journal}</option>));

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
        month: moment().format("MMMM"),
        year: moment().format("YYYY"),
        day: moment().format("D"),
        journal: null,
        colorMood: null,
        title: null,
        content: null,
        saved: false, 
    };
  }

  componentDidMount() {
    document.title = "Create a New Entry (Combined)";
  }

  componentDidUpdate(){
    if (this.state.saved){
      console.log("Create Entry toggle");
      this.setState({saved:false,});
    }
  }

  changeMonth = (event) => {this.setState({month: event.target.value});}
  changeDay = (event) => {this.setState({day: event.target.value});}
  changeYear = (event) => {this.setState({year: event.target.value});}  
  changeJournal = (event) => {this.setState({journal: event.target.value});}
  changeTitle = (event) => {this.setState({title: event.target.value});}
  changeContent = (event) => {this.setState({content: event.target.value});}
  changeColor = (color) => {this.setState({color: color});}

  addEntry = () => {
    console.log("Submitted Entry");
    post("/api/entries",{
        journal: this.state.journal,
        title: this.state.title,
        month: this.state.month,
        year: this.state.year,
        day: this.state.day,
        content: this.state.content,
        colorMood: this.state.color,
    }).then((entry) => {
        console.log(entry)});
  };

  render() {
    if (this.state.saved){
        alert("Congratulations!");
    }
    return (
    <>
    
    <div className="CreateEntry-wrapper">
      <div className="CreateEntry-inputSection">
        <div className = "u-flexRow">
          <div className="CreateEntry-dropdownButton">
            <select className="CreateEntry-selectContent" value={this.state.month} onChange={this.changeMonth}>{months}</select>
            </div>
            <div className="CreateEntry-dropdownButton">
            <select className="CreateEntry-selectContent" value={this.state.day} onChange={this.changeDay}>{days}</select>
            </div>
            <div className="CreateEntry-dropdownButton">
            <select className="CreateEntry-selectContent" value={this.state.year} onChange={this.changeYear}>{years}</select>
            </div>
        </div>
        <div className="CreateEntry-dropdownButton">
            <select className="CreateEntry-selectContent" value={this.state.journal} onChange={this.changeJournal}>{journals}</select>
        </div>
        <div className="TitleForm-inputBox">
            <input placeholder='Title' onChange={this.changeTitle}></input>
        </div>
        <div className="EnterEntry-contentBox">
            <textarea className="EnterEntry-content" placeholder='Today, I ...' onChange={this.changeContent}></textarea>
            <button className="EnterEntry-mic"><img src={mic} alt="Record Button - Microphone Image"></img></button>
        </div>
        <div>
            {colorList.map((color) => (
                <div className="u-inlineBlock" onClick={() => this.changeColor(color)}><Circle key={color} bgColor={color} selectedColor={this.state.color}/></div>
            ))}
        </div>
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

        <button className="CreateEntry-saveButton" onClick={this.addEntry}>
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
