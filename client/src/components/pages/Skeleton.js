import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//REPLACED WITH OUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "982536960811-6taskpv3uhgkihm76ej75g5i03u1g0mf.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>

      </>
    );
  }
}

export default Skeleton;
