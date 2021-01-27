import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

// to identify our application to Google's authentication service
const GOOGLE_CLIENT_ID = "982536960811-6taskpv3uhgkihm76ej75g5i03u1g0mf.apps.googleusercontent.com";

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
                    <Link to="/" className="NavBar-link"><img src={"https://storage.googleapis.com/tagheart/TagHeartLogo.svg"} height="80"/></Link>
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
                <Link to="/" className="NavBar-link"><img src={"https://storage.googleapis.com/tagheart/TagHeartLogo.svg"} height="80"/></Link>
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