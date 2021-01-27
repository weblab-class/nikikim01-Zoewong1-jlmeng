import React, { Component } from "react";
import { Router, Location } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import SpecificEntry from "./pages/SpecificEntry.js";
import Analysis from "./pages/Analysis.js";
import Profile from "./pages/Profile.js";
import Locked from "./pages/Locked.js";
import HomePage from "./pages/HomePage.js";
import LockedJournal from "./pages/LockedJournal.js";
import Calendar from "./pages/Calendar.js";
import NewEntry from "./pages/NewEntry.js";
import MoodTracker from "./pages/MoodTracker.js";
import Info from "./pages/Info.js";
import EntriesByMood from "./pages/EntriesByMood.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import AllEntries from "./pages/AllEntries.js";
//import TestOpenCV from "./pages/TestOpenCV.js";

class OnRouteChangeWorker extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.action()
    }
  }

  render() {
    return null
  }
}


const OnRouteChange = ({ action }) => (
    
  <Location>
    {({ location }) => <OnRouteChangeWorker location={location} action={action} />}
  </Location>
)


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
    // window.location.replace("/");
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
            <AllEntries userId={this.state.userId} username={this.state.username} path="/AllEntries"/>
            <SpecificEntry userId={this.state.userId} username={this.state.username} path="/SpecificEntry"/>
            <Analysis userId={this.state.userId} username={this.state.username} path="/Analysis"/>
            <Calendar userId={this.state.userId} username={this.state.username} path="/Calendar"/>
            <Profile path="/Profile:userId"
              userId = {this.state.userId}
            />
            <Info userId={this.state.userId} username={this.state.username} path="/Info"/>
            <EntriesByMood userId={this.state.userId} username={this.state.username} path="/EntriesByMood"/>
            <NewEntry userId={this.state.userId} username={this.state.username} path="/NewEntry"/>
            <MoodTracker userId={this.state.userId} username={this.state.username} path="/MoodTracker"/>
            <NotFound default />
            {//<TestOpenCV path="/TestOpenCV"/>
            }
            </>
          }


          {!this.state.userId && 

          <>
          <Info path="/Info"/>
            <Locked path="/"
            default
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
            />
            
            

            </>
          }
          
          
        </Router>
        <OnRouteChange action={() => { window.scrollTo(0, 0) }} />
      </>
    );
  }
}

export default App;
