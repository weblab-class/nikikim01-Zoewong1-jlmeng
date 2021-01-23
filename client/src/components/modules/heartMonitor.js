
import React, { Component } from "react";
import {Helmet} from "react-helmet";
import "./heartMonitor.css";

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
            <h1 className="heartMonitor-text">Hello HeartRate with Live Video</h1>
	        <canvas className="heartMonitor-webcam" id="output" ></canvas>
          <video hidden playsInline autoPlay></video>
          <p id="heartrate">Calibrating...</p>
          <canvas id="myChart" height="70%"></canvas>

        </div>
      )
    }

}    

export default HeartMonitor