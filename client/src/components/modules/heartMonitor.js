
import React, { Component } from "react";
import {Helmet} from "react-helmet";
import "./HeartMonitor.css";

class HeartMonitor extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {

      return(
        <div className="HeartMonitor-div" style={{justifyContent: "center", textAlign: "center"}}>
          <Helmet>
            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
            <script src="/fft.js"></script>
            <script src="/copy.js"></script>
	        </Helmet>
          <div className="u-flexColumn u-flex-justifyCenter" style={{justifyContent: "center"}}>
            <h1 className="HeartMonitor-text">Lightly place your finger on the webcam.</h1>
            <canvas className="HeartMonitor-webcam center" id="output"></canvas>
            <video className='center' hidden playsInline autoPlay></video>
            <p id="heartrate">Calibrating...</p>
          </div>
          <canvas id="myChart" height="5%" style={{visibility: "hidden"}}></canvas>

        </div>
      )
    }

}    

export default HeartMonitor