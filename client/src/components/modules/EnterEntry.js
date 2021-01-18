import React, { Component } from "react";

import "./EnterEntry.css";

import mic from "../../public/images/mic.png";

class EnterEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
      }

      componentDidMount() {
      }


      handleChange = (event) => {
          this.setState({ content: event.target.value });
      };

      render() {
        return (
            <div className="EnterEntry-contentBox">
                <input className="EnterEntry-content" placeholder='Today, I ...' onChange={this.handleChange}></input>
                <button className="EnterEntry-mic"><img src={mic} alt="Record Button - Microphone Image"></img></button>
            </div>
        )
      }
}

export default EnterEntry;