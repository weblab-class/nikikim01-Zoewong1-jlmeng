import React, { Component } from "react";

class Hover extends Component {
    constructor(props){
        super(props);
        this.state={
            img: this.props.img1     
        }
    }
  
    render() {
      return (
        <div>
          <img
            src={this.state.img}
            onMouseEnter={() => {
              this.setState({
                img: this.props.img2
              })
            }}
  
            onMouseOut={() => {
              this.setState({
                img: this.props.img1
              })
            }}
          />
        </div>
      )
    }
  };

  export default Hover;