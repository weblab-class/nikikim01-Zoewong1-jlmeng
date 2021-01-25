import React, { Component } from "react";

import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";


import "../../utilities.css";
import "./Locked.css";
import LeatherJournal from "../../public/images/LeatherJournal.svg";


class Locked extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() {
        return (
            <>
                {/* <div className="u-flex u-flex-alignCenter u-flex-justifyCenter">
                    <Link to="/Info" className="Locked-journalPic Locked-name">Tag Heart</Link>
                </div> */}
                <a href="./Info">
                    <div className="Locked-Journal">
                        <div className="back"></div>
                        <div className="page6"></div>
                        <div className="page5"></div>
                        <div className="page4"></div>
                        <div className="page3"></div>
                        <div className="page2"></div>
                        <div className="page1"></div>
                        <div className="front"></div>
                    </div>
                </a>
           
            </>
        );
    }   



}

export default Locked;