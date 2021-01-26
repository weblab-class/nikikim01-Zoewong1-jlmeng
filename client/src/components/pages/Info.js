import React, { Component } from "react";

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
            <div>
            <h1>omgggg what do u wanna know?</h1>

            </div>
        );
    }   
}

export default Info