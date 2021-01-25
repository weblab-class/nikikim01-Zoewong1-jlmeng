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
        
                    <Link to="/NewEntry"><img src={EditPen} className="HomePage-button HomePage-editPen u-editPen"></img></Link>
                    <Link to="/AllEntries" className="HomePage-journalPic HomePage-name">{this.props.username}</Link>
                    <Link to="/MoodTracker"><img className="HomePage-button" src={RedFlower}/></Link>
                    <div class="book">
                        <div class="back"></div>
                        <div class="page6"></div>
                        <div class="page5"></div>
                        <div class="page4"></div>
                        <div class="page3"></div>
                        <div class="page2"></div>
                        <div class="page1"></div>
                        <div class="front"></div>
                    </div>
                

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;