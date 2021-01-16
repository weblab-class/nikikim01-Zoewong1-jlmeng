import React, { Component } from "react";
import Circle from "./Circle.js";

class EntryColors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: null,
            circles: [],
        }
    }

    componentDidMount() {

    }

    colorClicked = (color) =>{
        this.setState({selectedColor: color});
        console.log("color changed");
    }

    render() {
        //for each color in colors, add a circle of that color to the line
        const colors = ["#B8D4FF", "#B9D99C", "#CAB8FF", "#D99C9C",
        "#F5CCEA", "#F9D142", "#F8E963"];
        let selected = false;

        return (
            <div>
                {colors.map((color) => (
                    <div onClick={() => this.colorClicked(color)}><Circle key={color} bgColor={color} selected={selected}/></div>
                ))}
            </div>
        )
    
    }
}

export default EntryColors;