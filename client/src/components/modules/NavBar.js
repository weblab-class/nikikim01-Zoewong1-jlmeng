import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";
import tagHeartLogo from "../../public/images/tagHeartLogo.png";
import settingsIcon from "../../public/images/settingsIcon.svg";

// to identify our application to Google's authentication service
const GOOGLE_CLIENT_ID = "126273665028-0hk9qp3k313dhcaql812d8pdb9m3p545.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. 
 */

 class NavBar extends Component {
     constructor(props) {
         super(props);
     }

     render() {
         return (
             <nav className="NavBar-container">
                  <div className="u-flex u-flex-alignCenter">
                    <Link to="/" className="NavBar-link"><img src={tagHeartLogo} height="40"/></Link>
                     <Link to="/CreateEntry" className="NavBar-link">New Entry</Link>
                     <Link to="/AllEntries" className="NavBar-link">Entries</Link>
                     <Link to="/Calendar" className="NavBar-link">Calendar</Link>
                     <Link to="/Feed" className="NavBar-link">Feed</Link>
                     <Link to="/Analysis" className="NavBar-link">Analysis</Link>
                     <Link to="/Profile" className="NavBar-link">Profile</Link>
                     </div>

                     <div className="logInOut">
                         <Link to="/Settings" className="NavBar-link"><img src={settingsIcon} height="40" className="NavBar-icon"></img></Link>
                     {this.props.userId ? (
                        <GoogleLogout
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={this.props.handleLogout}
                            onFailure={(err) => console.log(err)}
                        />
                        ) : (
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.props.handleLogin}
                            onFailure={(err) => console.log(err)}
                        />
                        )}
                     </div>
                     
                 
                 

             </nav>
         )
     }

 }

 export default NavBar;