import React, { Component } from "react";
import withOpenCVBackgroundSubtractor from "../modules/BackgroundSubtractor.js";
import ReactPlayer from 'react-player';
import OpenCV from "./OpenCv.js";
import Webcam from "react-webcam";

class TestOpenCV extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    componentDidMount() {
      document.title = "Test OpenCV";
    }

    render() {

        /* const videoPlayer = ReactPlayer;
        const options = []; */
        /* const BackgroundSubtractor = withOpenCVBackgroundSubtractor(
            videoPlayer,
            options,
          ); */
        /* return (
            
            <BackgroundSubtractor/>
        ) */

        //return (<OpenCV/>);
        const WebcamComponent = () => <Webcam />;
        return(
            <Webcam />
        );


    }
  }
  
  export default TestOpenCV;
  