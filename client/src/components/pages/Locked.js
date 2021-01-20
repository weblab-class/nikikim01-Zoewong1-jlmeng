import React, { Component } from "react";

import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Welcome from "../../public/images/Welcome.svg";


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
                <div className="u-flex u-flex-alignCenter u-flex-justifyCenter">
                    <img className="Locked-journal" src={LeatherJournal}></img>
                </div>
           
            </>
        );
    }   



}

export default Locked;