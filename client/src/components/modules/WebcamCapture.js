import React, { Component } from "react";
import Webcam from "react-webcam";

class WebcamCapture extends React.Component {
    render() {
      const videoConstraints = {
        width: 300,
        height: 200,
        facingMode: "user"
      };
   
      return <Webcam videoConstraints={videoConstraints} />;
    }
  }

  export default WebcamCapture