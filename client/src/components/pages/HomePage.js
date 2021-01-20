import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
import FountainPen from "../../public/images/FountainPen.svg";

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
                <Link to="/CreateEntry"><img src={FountainPen} className="HomePage-editPen u-editPen"></img></Link>
                <Link to="/AllEntries" className="HomePage-journalGrouped ">
                    <div className="u-backCover"/>
                    <div className="u-fakePage"/>
                    <div className="u-closeClasp"/>
                    <div className="u-fakePage"/>
                    <div className="u-frontCover"/>
                </Link>

                <Link to="/AllEntries" className="HomePage-journalGrouped ">
                    <div className="HomePage-backCover"/>
                    <div className="HomePage-fakePage"/>
                    <div className="HomePage-closeClasp"/>
                    <div className="HomePage-fakePage"/>
                    <div className="HomePage-frontCover"/>
                </Link>

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;