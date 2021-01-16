import React, { Component } from "react";

class Circle extends Component {
    constructor(props) {
        super(props); //color
        this.state = {
            selected: false,
        }
    }

    componentDidMount() {

    }

    render(){
        return (
            <div className="Circle" background-color={this.props.bgColor}></div>
        )
    }

}

export default Circle
    