import React, { Component } from "react";
import "./Circle.css";

class Circle extends Component {
    constructor(props) {
        super(props); //color
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


        if (this.props.selected) {
            return (
                <div style={{CircleStyle, border: 10}}> </div>
            )


        } else {
            return (
                <div style={CircleStyle}> </div>
            )
        }
    }

}

export default Circle
    