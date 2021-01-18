/* eslint-disable no-console */
/* eslint-disable no-undef */
import React from 'react';
import withOpenCV from '../pages/OpenCv.js';


export default function withOpenCVBackgroundSubtractor(videoPlayer, options) {
  class BackgroundSubtractor extends React.PureComponent {
    setupVideo = video => {
      this.cap = new cv.VideoCapture(video);
      this.frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
      this.fgmask = new cv.Mat(video.height, video.width, cv.CV_8UC1);
      this.fgbg = new cv.BackgroundSubtractorMOG2(500, 32, true);
    };


    processVideo = (video, canvas) => {
      try {
        if (this.cap && this.frame) {
          this.cap.read(this.frame);
          this.fgbg.apply(this.frame, this.fgmask);
          cv.imshow(canvas, this.fgmask);
        }
        // schedule the next one.
      } catch (err) {
        console.log(err);
      }
    };


    teardownVideo = () => {
      console.log('teardownVideo');
    };


    render() {
      const OpenCV = withOpenCV(
        videoPlayer,
        this.setupVideo,
        this.processVideo,
        this.teardownVideo,
        options,
      );
      return <OpenCV />;
    }
  }


  return BackgroundSubtractor;
}