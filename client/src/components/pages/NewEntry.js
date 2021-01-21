import React, { Component } from "react";
import "./NewEntry.css";
import moment from "moment";
import Creatable from 'react-select/creatable';
import Circle from "../modules/Circle.js";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const style = {
  control: base => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none",
  })
};

const numOfYears = 120;
const thisYear = new Date().getFullYear();

let yearList = new Array();
for (let i = numOfYears; i>0; i--) {
  let yr = thisYear-120+i;
  yearList.push(yr.toString());
}

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayList31 = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
const colorList = ["#B8D4FF", "#B9D99C", "#CAB8FF", "#D99C9C","#F5CCEA", "#F9D142", "#F8E963"];

// temporary values
const tags = [{
        value: 'fake1',
        label: 'School'
    },{
        value: 'fake2',
        label: 'Really Good Day'
    },{
        value: 'fake3',
        label: 'Read when in need of pick me up'
    }]

const journals = [{
        value: 'Journal1',
        label: 'School Journal',
    },{
        value: 'Journal2',
        label: 'Work Journal',
    }]

// const tagList = ["School","Really Good Day","Read when in need of pick me up"];
// const journalList = ['School Journal','Work Journal'];

const months = monthList.map((month) => (<option value={month}>{month}</option>));
const days31 = dayList31.map((day) => (<option value={day}>{day}</option>));
const days30 = dayList31.filter((day) => (parseInt(day,10) < 31)).map((day) => (<option value={day}>{day}</option>));
const days29 = dayList31.filter((day) => (parseInt(day,10) < 30)).map((day) => (<option value={day}>{day}</option>));
const days28 = dayList31.filter((day) => (parseInt(day,10) < 29)).map((day) => (<option value={day}>{day}</option>));
const years = yearList.map((year) => (<option value={year}>{year}</option>));
// const journals = journalList.map((journal) => (<option value={journal}>{journal}</option>));
let days = days31;


class NewEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            day: moment().format("D"),
            colorMood: null,
            title: null,
            content: null,
            saved: false, 
            tags: [],
        }
    }

    componentDidMount() {
        document.title = "Create a new entry!"
    }

    componentDidUpdate(){
        if (this.state.saved){
          console.log("Create Entry toggle");
          this.setState({saved:false,});
        }
      }

    refreshPage = () => {
        // window.location = window.location;
        window.location.reload();
      }

      changeMonth = (event) => {
        this.setState({month: event.target.value});
        if (["January", "March","May","July","August","October","December"].includes(event.target.value)){ 
            days = days31;
        } else if (event.target.value === "February"){
            days = (this.state.year % 4 === 0 ) ? days29 : days28;
        } else{
            days = days30;
        }
    }

  changeDay = (event) => {this.setState({day: event.target.value});}
  changeYear = (event) => {
      this.setState({year: event.target.value});
      if (this.state.month === "February"){
          days = event.target.value % 4 === 0 ? days29 : days28;
      }
    }
  changeTitle = (event) => {this.setState({title: event.target.value});}
  changeContent = (event) => {this.setState({content: event.target.value});}
  changeColor = (newColor) => {
    this.setState({colorMood: newColor});
  }
  changeTag = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.groupEnd();
    const temp = newValue.map((val) => (val.label));
    console.log(temp);
    this.setState({tags: temp,});
    };

    addEntry = () => {

        if (this.state.title === null || this.state.content === null || this.state.colorMood === null){
          console.log(this.state.title);
          console.log(this.state.content);
          console.log(this.state.colorMood);
          alert("You are missing some information in this journal entry!");
        } else{
          alert("Congratulations");
          this.refreshPage();
          console.log("Submitted Entry");
          post("/api/entries",{
              user_id: user_name,
              title: this.state.title,
              month: this.state.month,
              year: this.state.year,
              day: this.state.day,
              content: this.state.content,
              colorMood: this.state.colorMood,
              tags: this.state.tags,
              lastModDate: new Date(),
              heartRateData: [77,88],
              samplingRate: 100,
          }).then((response) => {
              console.log(response)});
          this.setState({
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            day: moment().format("D"),
            colorMood: null,
            title: null,
            content: null,
            saved: true, 
            tags: [],
          });
        }
    
      };
    

    render(){
      console.log(this.state.title);
      console.log(this.state.content);
      console.log(this.state.colorMood);
        return (
            <div className="NewEntry-background NewEntry-split">
                <div className="NewEntry-journal">
                    <div className="NewEntry-backCover">
                        <div className="NewEntry-clasp"/>
                        <div className="NewEntry-rightpage">
                              <div className = "NewEntry-date u-flexRow">
                                  <div className="NewEntry-dropdownButton">
                                    <select className="NewEntry-selectContent" value={this.state.month} onChange={this.changeMonth}>{months}</select>
                                    </div>
                                    <div className="NewEntry-dropdownButton">
                                    <select className="NewEntry-selectContent" value={this.state.day} onChange={this.changeDay}>{days}</select>
                                    </div>
                                    <div className="NewEntry-dropdownButton">
                                    <select className="NewEntry-selectContent" value={this.state.year} onChange={this.changeYear}>{years}</select>
                                    </div>
                                </div>
                            <div className="NewEntry-contentBox">
                                <Editor className="NewEntry-editor">
                                <input type="text" className="NewEntry-content" overflow="auto" placeholder="Today, I..."></input>
                                </Editor>
                            </div>    
                        </div>
                    </div>
                    <div className="NewEntry-frontCover">
                          <div className="NewEntry-leftpage">
                          <Creatable
                            className="NewEntry-creatable"
                            styles={style}
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            isMulti
                            isClearable
                            onChange={this.changeTag}
                            options = {tags}
                            placeholder='Tag(s)'
                            />
                            <div>
                              {colorList.map((color) => (
                                <div className="u-inlineBlock" onClick={() => this.changeColor(color)}>
                                  <Circle key={color} bgColor={color} selectedColor={this.state.colorMood}/>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}
export default NewEntry;