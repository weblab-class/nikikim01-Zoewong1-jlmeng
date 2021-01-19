import React, { Component } from "react";

class WebcamCapture extends React.Component {

    constructor(props) {
        super(props);
/*         this.state = {
            webcamRef: React.useRef(null)
        } */
    }

    capture = () => {
        React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );
    }
    
    render() {

        const videoConstraints = {
            width: 320,
            height: 240,
            facingMode: "user"
        };
   
        return (<Webcam mirrored={true} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />);
    }
  }

  export default WebcamCapture