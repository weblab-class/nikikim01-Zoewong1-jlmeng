import React, { Component } from "react";

import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";


import "../../utilities.css";
import "./Locked.css";

import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


class Locked extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        document.title = "Locked";
    }

    render() {
        return (
            <>
                {/* <div className="u-flex u-flex-alignCenter u-flex-justifyCenter">
                    <Link to="/Info" className="Locked-journalPic Locked-name">Tag Heart</Link>
                </div> */}

                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="CLICK ME!!">
                <a href="./Info">
                    <div className="Locked-Journal">
                        <div className="Locked-back"></div>
                        <div className="Locked-page6"></div>
                        <div className="Locked-page5"></div>
                        <div className="Locked-page4"></div>
                        <div className="Locked-page3"></div>
                        <div className="Locked-page2"></div>
                        <div className="Locked-page1"></div>
                        <div className="Locked-front"></div>
                    </div>
                </a>
                </Tooltip>
           
            </>
        );
    }   



}

export default Locked;