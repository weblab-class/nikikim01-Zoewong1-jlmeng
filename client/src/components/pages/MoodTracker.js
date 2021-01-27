import React, { Component } from "react";
import "./MoodTracker.css";
import { Link } from "@reach/router";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

class MoodTracker extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="MoodTracker-container">
                    <div className="MoodTracker-Hearts">
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Dead Tired...">
                        <Link to="/"><img className="MoodTracker-Heart blackHeart" src={'https://storage.googleapis.com/tagheart/heart_000000.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="hehe smiles *^-^*">
                        <Link to="/NewEntry"><img className="MoodTracker-Heart happyBlueHeart" src={'https://storage.googleapis.com/tagheart/heart_0BB5FF.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="blEhHh sICk">
                        <Link to="/"><img className="MoodTracker-Heart greenHeart" src={'https://storage.googleapis.com/tagheart/heart_54c452.svg'} 
                                height="80%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ANGGERRYYY">
                        <Link to="/"><img className="MoodTracker-Heart redHeart" src={'https://storage.googleapis.com/tagheart/heart_E35B5B.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="meh">
                        <Link to="/NewEntry"><img className="MoodTracker-Heart greyHeart" src={'https://storage.googleapis.com/tagheart/heart_717D7E.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="LOL AHAHA LMAO ROFL BWAHAHA">
                        <Link to="/"><img className="MoodTracker-Heart purpleHeart" src={'https://storage.googleapis.com/tagheart/heart_965AEA.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ugh">
                        <Link to="/NewEntry"><img className="MoodTracker-Heart brownHeart" src={'https://storage.googleapis.com/tagheart/heart_9a6a44.svg'} 
                                height="50%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="mwuah teehee">
                        <Link to="/NewEntry"><img className="MoodTracker-Heart pinkHeart" src={'https://storage.googleapis.com/tagheart/heart_F173D2.svg'} 
                                height="40%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="huh? omg!">
                        <Link to="/"><img className="MoodTracker-Heart orangeHeart" src={'https://storage.googleapis.com/tagheart/heart_FEC085.svg'} 
                                height="60%" /></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="HAPPY HAPPY SUNSHINE!!!">
                        <Link to="/NewEntry"><img className="MoodTracker-Heart yellowHeart" src={'https://storage.googleapis.com/tagheart/heart_FFD300.svg'} 
                                height="90%"/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="sniffle sniffle tears... sadness...">
                        <Link to="/"><img className="MoodTracker-Heart sadBlueHeart" src={'https://storage.googleapis.com/tagheart/heart_6BA0FC.svg'} 
                                height="40%"/></Link></Tooltip>
                    
                    
                </div>


                


            </div>
        );
    }
}

export default MoodTracker;