import React, { Component } from "react";
import Webcam from "react-webcam";
import {Helmet} from "react-helmet";
import InnerHTML from 'dangerously-set-html-content';
import ReactDOM from 'react-dom';

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

        
        return (
            //<InnerHTML html={html} />
            <iframe allowusermedia width="320" height="240" src="https://heartrateleaderboard.netlify.app/" allow="camera; microphone;"></iframe>
                
        //<Webcam mirrored={true} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
/*         <Helmet>
            <div>
                <table cellpadding="0" cellspacing="0" width="0" border="0">
                <tr>
                    <td>
                        <video id="videoInput" width="320" height="240"></video>
                    </td>
                    <td>
                        <canvas id="canvasOutput" width="320" height="240"></canvas>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <div class="caption">videoInput</div>
                    </td>
                    <td>
                        <div class="caption">canvasOutput</div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                </table>
            </div>
            <script src="https://webrtc.github.io/adapter/adapter-5.0.4.js" type="text/javascript"></script>
            <script src="utils.js" type="text/javascript"></script>
            <script id="codeSnippet" type="text/code-snippet">
                let video = document.getElementById('videoInput');
                let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
                let cap = new cv.VideoCapture(video);

                const FPS = 30;
                function processVideo() {
                    try {
                        if (!streaming) {
                            // clean and stop.
                            src.delete();
                            dst.delete();
                            return;
                        }
                        let begin = Date.now();
                        // start processing.
                        cap.read(src);
                        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
                        cv.imshow('canvasOutput', dst);
                        // schedule the next one.
                        let delay = 1000/FPS - (Date.now() - begin);
                        setTimeout(processVideo, delay);
                    } catch (err) {
                        utils.printError(err);
                    }
                };

                // schedule the first one.
                setTimeout(processVideo, 0);
                </script>
                <script type="text/javascript">
                let utils = new Utils('errorMessage');

                utils.loadCode('codeSnippet', 'codeEditor');

                let streaming = false;
                let videoInput = document.getElementById('videoInput');
                let startAndStop = document.getElementById('startAndStop');
                let canvasOutput = document.getElementById('canvasOutput');
                let canvasContext = canvasOutput.getContext('2d');

                startAndStop.addEventListener('click', () => {
                    if (!streaming) {
                        utils.clearError();
                        utils.startCamera('qvga', onVideoStarted, 'videoInput');
                    } else {
                        utils.stopCamera();
                        onVideoStopped();
                    }
                });

                function onVideoStarted() {
                    streaming = true;
                    startAndStop.innerText = 'Stop';
                    videoInput.width = videoInput.videoWidth;
                    videoInput.height = videoInput.videoHeight;
                    utils.executeCode('codeEditor');
                }

                function onVideoStopped() {
                    streaming = false;
                    canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
                    startAndStop.innerText = 'Start';
                }

                utils.loadOpenCv(() => {
                    startAndStop.removeAttribute('disabled');
                }
                
                );
            
            </script>
        </Helmet>
                    
            */    
           
        
        

        );
    }
}

  export default WebcamCapture;