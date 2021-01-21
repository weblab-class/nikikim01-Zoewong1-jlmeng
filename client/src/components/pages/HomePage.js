import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
import LeatherJournal from "../../public/images/LeatherJournal.svg";
import EditPen from "../../public/images/EditPen.svg";
import RedFlower from "../../public/images/RedFlower.svg";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() {
        return (
            <>  
            <div className="HomePage-container">

                <Link to="/NewEntry"><img src={EditPen} className="HomePage-button HomePage-editPen u-editPen"></img></Link>
            
                <Link to="/AllEntries"><img className="HomePage-button" src={LeatherJournal}/></Link>
                <Link to="/MoodTracker"><img className="HomePage-button" src={RedFlower}/></Link>

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;