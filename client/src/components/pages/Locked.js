import React, { Component } from "react";

import "../../utilities.css";

class Locked extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() {
        return (
            <h1>You are not logged in. Please log in to access this website.</h1>
        );
    }   



}

export default Locked;