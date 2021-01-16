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
        const colors = ["#B8D4FF", "#B9D99C", "#CAB8FF", "#D99C9C",
        "#F5CCEA", "#F9D142", "#F8E963"];

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