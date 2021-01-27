import React, { Component } from "react";
import "./Info.css";
import Hover from "../modules/Hover.js";
import "../../utilities.css"

function MyBook(props) {
    return (
      <HTMLFlipBook width={300} height={500}>
        <div className="demoPage">Page 1</div>
        <div className="demoPage">Page 2</div>
        <div className="demoPage">Page 3</div>
        <div className="demoPage">Page 4</div>
      </HTMLFlipBook>
    );
  }

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
      document.title = "Info";

    }

    render() {
        return (
            <div className="u-flex u-flexColumn u-flex-alignCenter" style={{justifyContent: "center", alignContent: "center"}}>
              <p> Welcome to Tag Heart, hover over the images to learn more! </p>
              <Hover img1="https://storage.googleapis.com/tagheart/homesc.png" img2="https://storage.googleapis.com/tagheart/homehovered.png"/>
              <Hover img1="https://storage.googleapis.com/tagheart/allentriessc.png" img2="https://storage.googleapis.com/tagheart/allentrieshovered.png"/>
              <Hover img1="https://storage.googleapis.com/tagheart/newentrysc.png" img2="https://storage.googleapis.com/tagheart/newentryhovered.png"/>
              <Hover img1="https://storage.googleapis.com/tagheart/entrysc.png" img2="https://storage.googleapis.com/tagheart/entryhovered.png"/>
              <Hover img1="https://storage.googleapis.com/tagheart/moodsc.png" img2="https://storage.googleapis.com/tagheart/moodhovered.png"/>
            </div>
        );
    }   
}

export default Info