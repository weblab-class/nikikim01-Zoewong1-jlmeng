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

        let tempcircles = [];
        
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i];
            let selected = false;
            if (color === this.state.selectedColor) {
                console.log(color);
                let selected = true;
            }
            console.log(color);
    
           tempcircles = tempcircles.concat(<Circle key={i+color} bgColor={color} selected={selected} onClick={() => console.log("hello")}/>);
        }

        return (
            <div>
                {this.state.circles}
            </div>
        )
    
    }
}

export default EntryColors;