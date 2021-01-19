import React, { Component } from "react";
import "./Analysis.css";


class Analysis extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <>
            <div className="Analysis-wordBoxes">
                <h1 className="Analysis-header">Most commonly used words when heart rate is... </h1>

                <div className="Analysis-wordGraphBox">
                    <div className="Analysis-belowAverage">
                        <h3>BELOW AVERAGE</h3>
                    </div>
                    <div className="Analysis-Average">
                        <h3>AVERAGE</h3>
                    </div>
                    <div className="Analysis-aboveAverage">
                        <h3>ABOVE AVERAGE</h3>
                    </div>
                </div>

            </div>

            <div className="Analysis-trackerAvgBPM">
                <h1 className="Analysis-header Analysis-moodTracker">Mood Tracker</h1>
                <h1 className="Analysis-header Analysis-AvgHeartRate">Average Heart Rate</h1>
            </div>

            <div ><p className="Analysis-disclaimer">The content on this website is not intended to be a substitute
             for professional medical advice, diagnosis or treatment. Always consult with a qualified and licensed
              physician or other medical care provider, and follow their advice regardless of anything read on 
              this website. Please do not sue us we are broke college students.</p></div>
            </>
        );
    }
}

export default Analysis;