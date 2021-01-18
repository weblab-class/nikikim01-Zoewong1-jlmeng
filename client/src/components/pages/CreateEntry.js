import React, { Component } from "react";

import EntryColors from "../modules/EntryColors.js";



class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    document.title = "Create a New Entry";
  }



  render() {
    return (
    <>
    <h1 className = "months">January</h1>
    <EntryColors/>
    </>
    )
  }
}

export default CreateEntry;
