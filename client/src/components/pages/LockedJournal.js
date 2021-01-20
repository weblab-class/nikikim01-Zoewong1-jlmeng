import React, { Component } from "react";
import "./LockedJournal.css";

class LockedJournal extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="LockedJournal-desk">
                <div className="LockedJournal-book">
                    <div className="LockedJournal-backCover"></div>
                    <div className="LockedJournal-frontCover"></div>
                    <div className="LockedJournal-binds"></div>
                </div>
            </div>
            
        );
    }
}

export default LockedJournal;