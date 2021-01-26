import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
import EditPen from "../../public/images/EditPen.svg";
import RedFlower from "../../public/images/RedFlower.svg";

import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


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
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Create New Entry">
                    <div><Link to="/NewEntry"><img src={EditPen} className="HomePage-button HomePage-editPen u-editPen"></img></Link></div>
                </Tooltip>
                    
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See All Entries">
                    <Link to="/AllEntries" className="HomePage-journalPic HomePage-name">{this.props.username}</Link>
                </Tooltip>
                
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See Mood Tracker">
                    <div><Link to="/MoodTracker"><img className="HomePage-button" src={RedFlower}/></Link></div>
                </Tooltip>
                    
                

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;