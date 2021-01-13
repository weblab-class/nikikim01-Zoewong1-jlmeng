import React, { Component } from "react";
import "./NotFound.css";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <div><h1 className="u-textCenter">The page you requested couldn't be found.</h1></div>
      <div className="notFound-Image">
        
      </div>
      </>
    );
  }
}

export default NotFound;
