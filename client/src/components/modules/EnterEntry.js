import React, { Component } from "react";

import "./EnterEntry.css";

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
                <input placeholder='Today, I ...' onChange={this.handleChange}></input>
            </div>
        )
      }
}

export default EnterEntry;