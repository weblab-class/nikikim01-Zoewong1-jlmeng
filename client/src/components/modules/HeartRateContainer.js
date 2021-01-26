import React from "react";
import {Helmet} from "react-helmet";
import "./HeartRateContainer.css";
import "../../utilities.css"

class HeartRateContainer extends React.Component {
  render() {
    return (
	<div className="HeartRateContainer-div" style={{justifyContent: "center", textAlign: "center"}}>
	    <Helmet>
		<script src="https://webrtc.github.io/adapter/adapter-5.0.4.js"></script>
		<script src="/utils.js" type="text/javascript"></script>
		<script src="/processVideo.js" type="text/javascript"></script>
		<script src="/fft.js"></script>
	    </Helmet>
		<br></br>
		<br></br>
	    <div className="control"><button id="startAndStop" disabled>Start</button></div>
	    
		<br></br>
		<br></br>
		<div className="HeartRateContainer-div u-flexColumn u-flex-justifyCenter" style={{textAlign: "center", justifyContent: "center"}}>
		
			<table cellPadding="0" cellSpacing="0" width="0" border="0">
				<thead>
				<tr>
					<td>
					<video id="videoInput" width="320" height="240" style={{display: "none"}}></video>
					</td>
					<td>
					<canvas className='center HeartRateContainer-webcam' id="canvasOutput"></canvas>
					</td>
				</tr>
				</thead>
			</table>
			<p id="heartrate">Calibrating...</p>

	    </div>
	    <p className="err" id="errorMessage"></p>
	</div>
    )
  }
}
export default HeartRateContainer
