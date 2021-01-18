import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//REPLACED WITH OUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "126273665028-0hk9qp3k313dhcaql812d8pdb9m3p545.apps.googleusercontent.com";

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
