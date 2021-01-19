import React, { Component } from "react";

import "../../utilities.css";


class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            GoodVibes: 0,
        }
    }

    incrementGoodVibes = () => {
        this.setState({
            GoodVibes: this.state.GoodVibes + 1,
        });
    };

    componentDidMount(){
        document.title = 'Profile Page';
        get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }

    render(){
        if (!this.state.user) {
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