import React, { Component } from "react";
import editIcon from "../../public/images/editIcon.svg";
import samoyed from "../../public/images/samoyed.jpg";
import "./SpecificEntry.css";

class SpecificEntry extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    document.title = "Specific Entry";
  }

  render() {
    return (
        <>
        <div className="u-flexColumn u-flex-alignCenter">
            <div className="u-flexRow u-flex-alignCenter SpecificEntry-dateBox">
                <div className="u-flexRow SpecificEntry-firstHalf">
                    <p className="SpecificEntry-month">JAN</p>
                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SpecificEntry-circle">
                            <p className="SpecificEntry-day">05</p>
                    </div>
                </div>
                <p className="SpecificEntry-year">2021</p>
            </div>
            <div className="SpecificEntry-entryBox">
                <h1 className="SpecificEntry-entryTitle">Entry1</h1>
                <p className="SpecificEntry-entryContent">Hello</p>
            </div>
            <div className="u-flexRow">
                <img src={samoyed} className="SpecificEntry-entryImage"></img>
                
            </div>
        </div>
        <img src={editIcon} className="SpecificEntry-editIcon"></img>
        
        </>
    );
  }
}

export default SpecificEntry;
