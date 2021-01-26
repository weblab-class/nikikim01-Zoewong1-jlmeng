import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import CreateEntry from "./pages/CreateEntry.js";
import CreateEntry1 from "./pages/CreateEntry1.js";
import SpecificEntry from "./pages/SpecificEntry.js";
import Analysis from "./pages/Analysis.js";
import Profile from "./pages/Profile.js";
import Locked from "./pages/Locked.js";
import HomePage from "./pages/HomePage.js";
import LockedJournal from "./pages/LockedJournal.js";
import Calendar from "./pages/Calendar.js";
import NewEntry from "./pages/NewEntry.js";
import MoodTracker from "./pages/MoodTracker.js";

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
      username: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id,
          username: user.name,
        });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({
        userId: user._id,
        username: user.name,
      });
      console.log(user._id.valueOf());
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    console.log('Logged out Successfully!')
    this.setState({ userId: null });
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
          <LockedJournal path="/LockedJournal"/>
          {this.state.userId && 
            <>
            <HomePage userId={this.state.userId} username={this.state.username} path="/"/>
            <CreateEntry1 userId={this.state.userId} username={this.state.username} path="/CreateEntry"/>
          {/* <CreateEntry path="/CreateEntry"/> */}
            <AllEntries userId={this.state.userId} username={this.state.username} path="/AllEntries"/>
            <SpecificEntry userId={this.state.userId} username={this.state.username} path="/SpecificEntry"/>
            <Analysis userId={this.state.userId} username={this.state.username} path="/Analysis"/>
            <Calendar userId={this.state.userId} username={this.state.username} path="/Calendar"/>
            <Profile path="/Profile:userId"
              userId = {this.state.userId}
            />
            <NewEntry userId={this.state.userId} username={this.state.username} path="/NewEntry"/>
            <MoodTracker userId={this.state.userId} username={this.state.username} path="/MoodTracker"/>
            <NotFound default />
            {//<TestOpenCV path="/TestOpenCV"/>
            }
            </>
          }
          


          {!this.state.userId && 

          <>
            <Locked path="/"
            default
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
            />
            

            </>
          }
          
          
        </Router>
      </>
    );
  }
}

export default App;
