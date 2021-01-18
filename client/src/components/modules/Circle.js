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
            borderRadius: "50%",
            width:25,
            height:25,
            backgroundColor: this.props.bgColor,
            borderWidth: 5,
            borderColor: "#FFFFFF",
            borderStyle: "solid"
        }

        const CircleSelected = {
            padding:10,
            margin: 20,
            display:"inline-block",
            borderRadius: "50%",
            width:25,
            height:25,
            backgroundColor: this.props.bgColor,
            borderWidth: 5,
            borderColor: "#E0E0E0",
            borderStyle: "solid"
        }


        if (this.props.selectedColor === this.props.bgColor) {
            console.log(this.props.selectedColor)
            return (
                
                <div style={CircleSelected}> </div>
            )


        } else {
            return (
                <div style={CircleStyle}> </div>
            )
        }
    }

}

export default Circle
    