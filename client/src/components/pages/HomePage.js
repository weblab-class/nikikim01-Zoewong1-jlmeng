import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
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
                    <div><Link to="/NewEntry"><img src={EditPen} className="HomePage-button HomePage-editPen u-editPen"></img></Link></div>
                    
                    <Link to="/AllEntries" className="HomePage-journalPic HomePage-name">{this.props.username}</Link>
                    <div><Link to="/MoodTracker"><img className="HomePage-button" src={RedFlower}/></Link></div>
                    
                

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;