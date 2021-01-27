import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";

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
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Create New Entry!">
                    <div className="u-flex u-flexRow">
                        <div style={{justifyContent: "center"}}>
                            <Link to="/NewEntry"><img src={"https://storage.googleapis.com/tagheart/EditPen.svg"} className="HomePage-button HomePage-editPen u-editPen"></img></Link>
                        </div>
                    </div>
                </Tooltip>
                    
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See All Entries">
                    <div className="u-flex u-flexRow">
                        <Link to="/AllEntries" className="HomePage-journalPic HomePage-name">{this.props.username}</Link>
                    </div>
                </Tooltip>

                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See Mood Tracker">
                    <div className="u-flex u-flexRow">
                        <div style={{justifyContent: "center"}}>
                            <Link to="/MoodTracker"><img className="HomePage-button" src={"https://storage.googleapis.com/tagheart/RedFlower.svg"}/></Link>
                        </div>
                    </div>
                </Tooltip>
                    
                

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;