import React, { Component } from "react";
import PaintBrush from "../../public/images/PaintBrush.svg";

class MoodTracker extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div>
                <img src={PaintBrush} height="800"/>
            </div>
        );
    }
}

export default MoodTracker;