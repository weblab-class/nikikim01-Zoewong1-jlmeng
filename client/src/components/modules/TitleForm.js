import React, { Component } from "react";
import "./TitleForm.css";

class TitleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
        };
      }

      componentDidMount() {
        document.title = "Create a New Entry";
      }


      handleChange = (event) => {
          this.setState({ title: event.target.value });
      };

      render() {
        return (
            <div className="TitleForm-inputBox">
                <input placeholder='Title' onChange={this.handleChange}></input>
            </div>
        )
      }
}

export default TitleForm;