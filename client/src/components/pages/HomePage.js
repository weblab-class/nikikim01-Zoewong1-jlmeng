import React, { Component } from "react";

import "./HomePage.css";
import "../../utilities.css";
import { Link } from "@reach/router";
import FountainPen from "../../public/images/FountainPen.svg";
import LeatherJournal from "../../public/images/LeatherJournal.svg";

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
                {/* <div className="HomePage-journals"> */}
                <Link to="/AllEntries" className="HomePage-journal1 ">
                    {/* <div className="u-backCover"/>
                    <div className="u-fakePage"/>
                    <div className="u-closeClasp"/>
                    <div className="u-fakePage"/>
                    <div className="u-frontCover"/> */}
                </Link>

                <Link to="/AllEntries" className="HomePage-journal2 ">
                    {/* <div className="HomePage-backCover"/>
                    <div className="HomePage-fakePage"/>
                    <div className="HomePage-closeClasp"/>
                    <div className="HomePage-fakePage"/>
                    <div className="HomePage-frontCover"/> */}
                </Link>
                {/* </div> */}

            </div>
                
                
                
            </>
        );
    }   



}

export default HomePage;