import React, { Component } from "react";
import PropTypes from 'prop-types';

import "../../utilities.css";
import "./SingleEntry.css";

/** 
 * @param {string} _id of entry
 * @param {int} day of entry
 * @param {string} title of entry
 * @param {string} content
*/
class SingleEntry extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div className="u-flexRow u-flex-justifyCenter">
                <div className="SingleEntry-date">
                    <h1 className="SingleEntry-num">{this.props.day}</h1>
                </div>
                <div className="SingleEntry-container">
                    <h1 className="SingleEntry-title">{this.props.title}</h1>
        <p className="SingleEntry-content">{this.props.content}</p>
                </div>
            </div>
        )
    }
}

export default SingleEntry;