import React, { Component } from "react";
import Circle from "./Circle.js";

class EntryColors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: null,
        }
    }

    componentDidMount() {

    }

    render() {
        //for each color in colors, add a circle of that color to the line
        const colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
"       #85FFC7", "#297373", "#FF8552", "#A40E4C"];

        let circles = [];
        
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i];
            circles.push(<Circle key={i+color} bgColor={color}/>);

        }

        return (
            <div>
                {circles}
            </div>
        )
    
    }
}

export default EntryColors;