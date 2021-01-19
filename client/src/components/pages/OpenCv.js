/* eslint-disable no-console */
import React, { Fragment, Component } from 'react';


import injectScript from '../../utils/injectScripts.js';
const OPENCV_URL = 'https://docs.opencv.org/3.4.0/opencv.js';

export default function withOpenCV( videoPlayer, setupVideo, processVideo, teardownVideo, options, playerEventHandler, ) {
  class OpenCV extends Component {
    constructor(props) {
      super(props);
      this.playerRef = React.createRef();
      this.loadOpenCv();
    }

    loadOpenCv = () => {
      
      const promise = injectScript('opencv-injected-js', OPENCV_URL);
      promise
        .then(() => {
          console.log(`success to load ${OPENCV_URL}`);
          // eslint-disable-next-line no-undef
          console.log(cv.getBuildInformation());
          this.playerRef.trigger('opencvReady');
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log(`Failed to load ${OPENCV_URL}`);
        });
    };


    playerEventHandler(type, e) {
      if (playerEventHandler != null) {
        playerEventHandler(type, e);
      }
    }


    render = () => {
      const Player = videoPlayer;
      return (
        <Fragment>
          <Player
            ref={this.playerRef}
            {...options}
            setupVideo={setupVideo}
            processVideo={processVideo}
            teardownVideo={teardownVideo}
            playerEventHandler={this.playerEventHandler}
          />
        </Fragment>
      );
    };
  }
  return OpenCV;
}