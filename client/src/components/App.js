import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import CreateEntry from "./pages/CreateEntry.js";
import SpecificEntry from "./pages/SpecificEntry.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import AllEntries from "./pages/AllEntries.js";
//import TestOpenCV from "./pages/TestOpenCV.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
          <NavBar
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
        <Router>
          <NotFound default />
          <CreateEntry path="/"/>
          <CreateEntry path="/CreateEntry"/>
          <AllEntries path="/AllEntries"/>
          <SpecificEntry path="/SpecificEntry"/>
          {//<TestOpenCV path="/TestOpenCV"/>
          }
        </Router>
      </>
    );
  }
}

export default App;
