import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
import LeatherJournal from "../../public/images/LeatherJournal.svg";
import EditPen from "../../public/images/EditPen.svg";
import RedFlower from "../../public/images/RedFlower.svg";


/**
 * @param userId
 * @param username
 */
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
                <Link to="/AllEntries" className="HomePage-journalPic"><h1 className="HomePage-name">{this.props.username}</h1></Link>
                    <Link to="/MoodTracker"><img className="HomePage-button" src={RedFlower}/></Link>

                

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;