import React from "react";
import {Helmet} from "react-helmet";
import "./HeartRateContainer.css";
import "../../utilities.css"
import Webcam from "react-webcam";
/* import {heartrates} from "../../../dist/processVideo.js"; */

class HeartRateContainer extends React.Component {

	render() {
		/* updateHeartrates(); */
		return (
			
			<div style={{textAlign: "center"}}>
				<Helmet>
				<script src="https://webrtc.github.io/adapter/adapter-5.0.4.js"></script>
				<script src="/utils.js" type="text/javascript"></script>
				<script src="/processVideo.js" type="text/javascript"></script>
				<script src="/fft.js"></script>
				<script src="/processVideo.js"></script>
				<script src="/utils.js"></script>
				</Helmet>
		
				<div className="control"><button id="startAndStop" disabled>Start</button></div>
				
				<br></br>
				<br></br>
				<div className="HeartRateContainer-div u-flexColumn u-flex-alignCenter" style={{textAlign: "center", justifyContent: "center"}}>
				
					<table cellPadding="0" cellSpacing="0" width="0" border="0">
						<thead>
						<tr>
							<td>
								<video id="videoInput" width="320" height="240" style={{display: "none"}}></video>
							</td>
							<td>
							<	canvas className='center HeartRateContainer-webcam' id="canvasOutput"></canvas>
							</td>
						</tr>
						</thead>
					</table>
					<p id="heartrate"> -- BPM </p>
					<p id="hrArray" style={{display: "none"}}> [0] </p>
					<p id="timeArray" style={{display: "none"}}> [0]</p> 
					<p id="avgHR" style={{display: "none"}}> 0 </p>

				</div>
				<p className="err" id="errorMessage"></p>
			</div>
		)
  }
}
export default HeartRateContainer
