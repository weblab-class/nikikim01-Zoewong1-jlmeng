import React, { Component } from "react";
import "./NewEntry.css";
import EnterEntry from "../modules/EnterEntry.js";

class NewEntry extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="NewEntry-background">
                <div className="NewEntry-backCover"/>
                <div className="NewEntry-frontCover"/>
                <div className="NewEntry-page"/>
                <div className="NewEntry-clasp"/>

                <div className="NewEntry-contentBox">
                    

                </div>

            </div>
        );
    }
}
export default NewEntry;