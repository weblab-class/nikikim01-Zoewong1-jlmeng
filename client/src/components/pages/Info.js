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
    render() {
        return (
            <div className="u-flex u-flexColumn u-flex-alignCenter" style={{justifyContent: "center", alignContent: "center"}}>
              <Hover img1="https://storage.googleapis.com/tagheart/homesc.jpeg" img2="https://storage.googleapis.com/tagheart/homehovered.jpeg"/>
              <Hover img1="https://i.vimeocdn.com/portrait/58832_300x300" img2="http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png"/>
              <Hover img1="https://i.vimeocdn.com/portrait/58832_300x300" img2="http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png"/>
              <Hover img1="https://i.vimeocdn.com/portrait/58832_300x300" img2="http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png"/>
              <Hover img1="https://i.vimeocdn.com/portrait/58832_300x300" img2="http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png"/>
              <Hover img1="https://i.vimeocdn.com/portrait/58832_300x300" img2="http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png"/>
            </div>
        );
    }   
}

export default Info