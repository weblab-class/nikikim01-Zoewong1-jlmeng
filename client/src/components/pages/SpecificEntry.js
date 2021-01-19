import React, { Component } from "react";
import {get} from "../../utilities.js"
// import {useLocation} from "react-router-dom";
import editIcon from "../../public/images/editIcon.svg";
import samoyed from "../../public/images/samoyed.jpg";
import "./SpecificEntry.css";

class SpecificEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      year: "",
      day: "",
      journal: null,
      colorMood: null,
      title: null,
      content: null,
      saved: false, 
      tags: [],
    }
  }

  componentDidMount(){
    document.title = "Specific Entry";
    const temp = window.location.href;
    const param = temp.split(window.location.pathname)[1].split("?")[1];
    console.log(param);

    get("/api/entry",{_id:Object(param)}).then((response) => {
      console.log(response);
      this.setState({
        month: response[0].month,
        year: response[0].year,
        day: response[0].day,
        journal: response[0].journal,
        colorMood: response[0].colorMood,
        title: response[0].title,
        content: response[0].content,
        tags: response[0].tags,
      })
    });
  }

  render() {
    console.log(this.state.month);
    console.log(this.state.day);
    return (
        <>
        <div className="u-flexColumn u-flex-alignCenter">
            <div className="u-flexRow u-flex-alignCenter SpecificEntry-dateBox">
                <div className="u-flexRow SpecificEntry-firstHalf">
                    <p className="SpecificEntry-month">{this.state.month}</p>
                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SpecificEntry-circle">
                      <p className="SpecificEntry-day">{this.state.day}</p>
                    </div>
                </div>
                  <p className="SpecificEntry-year">{this.state.year}</p>
            </div>
            <div className="SpecificEntry-entryBox">
                <h1 className="SpecificEntry-entryTitle" style={{color:this.state.colorMood}}>{this.state.title}</h1>
                <p className="SpecificEntry-entryContent">{this.state.content}</p>
            </div>
            <div className="u-flexRow" style={{justifyContent:"space-evenly", width:"988px"}}>
                <img src={samoyed} className="SpecificEntry-entryImage"></img>
                <div className="SpecificEntry-heartRate">
                  <p style={{textAlign:"center"}}>Heart Rate Here</p>
                </div>
                <div className="SpecificEntry-Analysis">
                <p style={{textAlign:"center"}}>Analysis Here</p>
                </div>
            </div>
        </div>
        <img src={editIcon} className="SpecificEntry-editIcon" onClick={() => {console.log("I want to edit!")}}></img>
        
        </>
    );
  }
}

export default SpecificEntry;
