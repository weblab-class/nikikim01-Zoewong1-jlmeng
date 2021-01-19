import React, { Component } from "react";
import Webcam from "react-webcam";

class WebcamCapture extends React.Component {
    render() {
      const videoConstraints = {
        width: 415,
        height: 283,
        facingMode: "user"
      };
   
      return <Webcam videoConstraints={videoConstraints} className="WebCamera"/>;
    }
  }

  export default WebcamCapture