import React, { Component } from "react";
import { Router } from "@reach/router";


import { get } from "../../utilities";
import "../../utilities.css";


class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            GoodVibes: 0,
            user: undefined,
            loading: true,
        }
    }

    incrementGoodVibes = () => {
        this.setState({
            GoodVibes: this.state.GoodVibes + 1,
        });
    };

    componentDidMount(){
        document.title = 'Profile Page';
        get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user, loading:false }));
    }

    render(){
        if (this.state.loading) {
            return <div> Loading! </div>;}
        return (
            <>

            <div className="Profile-pictureContainer" onClick={() => {this.incrementGoodVibes();}}>
                <div className="Profile-picture"></div>
            </div>

            <h1 className="Profile-name">{this.state.user.name}</h1>


            <div className="Profile-statsContainer">


            </div>

            <div className="Profile-entryGalleryContainer">


            </div>

            </>
        );
    }

}

export default Profile;