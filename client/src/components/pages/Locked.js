import React, { Component } from "react";

import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import tagHeartLogo from "../../public/images/tagHeartLogo.png";


import "../../utilities.css";
import "./Locked.css";

const GOOGLE_CLIENT_ID = "126273665028-0hk9qp3k313dhcaql812d8pdb9m3p545.apps.googleusercontent.com";

class Locked extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() {
        return (
            <>
            <div className="Locked-entire">
                <div className="Locked-container">
                    <div className="Locked-welcome u-flex">
                        <h1 className="Locked-header">Welcome to</h1>
                        <Link to="/" className="Locked-logo u-flex"><img src={tagHeartLogo} height="70"/></Link>
                        <h1 className="Locked-header">Please Log In to access our platform!</h1>
                    </div>
                
                
                <div className="Locked-loginButton u-flex">
                    {this.props.userId ? (
                        <GoogleLogout
                        className='Locked-google'
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                        onFailure={(err) => console.log(err)}
                    />
                    ):(
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.props.handleLogin}
                            onFailure={(err) => console.log(err)}
                        />

                    )}
                </div>
            </div>
           
           </div>
            </>
        );
    }   



}

export default Locked;