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
             <>


            <nav className = "NavBar-container">
                {this.props.userId ? (
                <>
                <div className="u-flex u-flex-alignCenter">
                    <Link to="/" className="NavBar-link"><img src={tagHeartLogo} height="40"/></Link>
                    {/* <Link to="/Feed" className="NavBar-link">Feed</Link> */}
                    {/* <Link to={"/Profile/"+ this.props.userId} className="NavBar-link">Profile</Link> */}
                </div>
                <div className="NavBar-logInOutSettings">
                <GoogleLogout
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                />
                </div>
                </>
                ) : (
                <>
                <Link to="/" className="NavBar-link"><img src={tagHeartLogo} height="40"/></Link>
                <div className="NavBar-logInOutSettings">
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.props.handleLogin}
                    onFailure={(err) => console.log(err)}
                />
                </div>

                </>
                )}

            </nav>

             </>
         )
     }

 }

 export default NavBar;