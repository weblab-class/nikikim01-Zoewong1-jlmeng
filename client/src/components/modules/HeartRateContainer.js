import React from "react";
import {Helmet} from "react-helmet";
import "./HeartRateContainer.css";
import "../../utilities.css"
/* import {heartrates} from "../../../dist/processVideo.js"; */

class HeartRateContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			heartrates: [0]
		};
	  }

	render() {
		/* updateHeartrates(); */
		return (
			
			<div className="HeartRateContainer-div" style={{justifyContent: "center", textAlign: "center"}}>
				<Helmet>
				<script src="https://webrtc.github.io/adapter/adapter-5.0.4.js"></script>
				<script src="/utils.js" type="text/javascript"></script>
				<script src="/processVideo.js" type="text/javascript"></script>
				<script src="/fft.js"></script>
				<script src="/processVideo.js"></script>
				<script src="/utils.js"></script>
				</Helmet>
				<br></br>
				<br></br>
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
					<p id="heartrate">Calibrating...</p>
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
