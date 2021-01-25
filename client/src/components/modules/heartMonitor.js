
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
        <div>
          <Helmet>
            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
            <script src="/fft.js"></script>
            <script src="/copy.js"></script>
	        </Helmet>
          <div style={{justifyContent: "center"}}>
            <h1 className="HeartMonitor-text">Hello HeartRate with Live Video</h1>
            <canvas className="HeartMonitor-webcam" id="output"></canvas>
            <video hidden playsInline autoPlay></video>
            <p id="heartrate">Calibrating...</p>
          </div>
          <canvas id="myChart" height="70%"></canvas>

        </div>
      )
    }

}    

export default HeartMonitor