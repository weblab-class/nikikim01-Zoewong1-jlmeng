import React, { Component } from "react";
import "./Circle.css";

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
        const CircleStyle = {
            padding:10,
            margin: 20,
            display:"inline-block",
            borderRadius: 100,
            width:25,
            height:25,
            backgroundColor: this.props.bgColor
        }

        return (
            <div className="Circle-format" style={CircleStyle}> </div>
        )
    }

}

export default Circle
    