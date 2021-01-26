import React, { Component } from "react";
import "./MoodTracker.css";
import { Link } from "@reach/router";

class MoodTracker extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="MoodTracker-container">
                <div className="MoodTracker-easel">
                    <div className="MoodTracker-canvas">
                    <div className="MoodTracker-Hearts">
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_000000.svg'} 
                                height="10%" style={{transform: "rotate(5deg"}}/></Link>
                        <Link to="/NewEntry"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_0BB5FF.svg'} 
                                height="10%" style={{transform: "rotate(-9deg"}}/></Link>
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_54c452.svg'} 
                                height="10%" style={{transform: "rotate(8deg"}}/></Link>
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_E35B5B.svg'} 
                                height="10%" style={{transform: "rotate(-9deg"}} /></Link>
                        <Link to="/NewEntry"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_717D7E.svg'} 
                                height="10%" style={{transform: "rotate(4deg"}}/></Link>
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_965AEA.svg'} 
                                height="10%" style={{transform: "rotate(-12deg"}}/></Link>
                        <Link to="/NewEntry"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_9a6a44.svg'} 
                                height="10%" style={{transform: "rotate(1deg"}}/></Link>
                        <Link to="/NewEntry"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_F173D2.svg'} 
                                height="10%" style={{transform: "rotate(6deg"}} /></Link>
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_FEC085.svg'} 
                                height="10%" style={{transform: "rotate(-7deg"}} /></Link>
                        <Link to="/NewEntry"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_FFD300.svg'} 
                                height="10%" style={{transform: "rotate(7deg"}}/></Link>
                        <Link to="/"><img className="MoodTracker-Heart" src={'https://storage.googleapis.com/tagheart/heart_6BA0FC.svg'} 
                                height="10%" style={{transform: "rotate(-3deg"}}/></Link>
                    </div>
                    </div>
                    
                </div>
                <div className="MoodTracker-palette"><img src="https://storage.googleapis.com/tagheart/Palette.svg"></img></div>
                <div className="MoodTracker-brush">
                    <img src={"https://storage.googleapis.com/tagheart/PaintBrush.svg"} height="60%"/>
                </div>

                


            </div>
        );
    }
}

export default MoodTracker;