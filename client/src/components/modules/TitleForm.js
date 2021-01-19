import React, { Component } from "react";
import "./TitleForm.css";


/**
 * Proptypes
 *  @param {boolean} saved
 * */
class TitleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
        };
      }

      componentDidMount() {
      }

      componentDidUpdate(){
        console.log(this.state.title);
        if(this.props.saved){
          console.log("Title Form toggle");
            this.setState({
            title:'',
          })
        }
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