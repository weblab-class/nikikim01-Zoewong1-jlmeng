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
    return (
    <>
    
    <div className="CreateEntry-wrapper">
      <div className="CreateEntry-inputSection">
        <div className = "CreateEntry-date">
          <MonthsDropdown />
          <DaysDropdown />
          <YearsDropdown/>
        </div>
        <JournalsDropdown />
          
          <TitleForm/>
          <EnterEntry/>
        <EntryColors/>

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

        <button className="CreateEntry-saveButton">
          <div className="CreateEntry-saveHeart"></div>
          <p className="CreateEntry-saveText">Save</p>
          <div className="CreateEntry-saveHeart"></div>
        </button>

      </div>

    </div>
   
    </>
    )
  }
}

export default CreateEntry;
