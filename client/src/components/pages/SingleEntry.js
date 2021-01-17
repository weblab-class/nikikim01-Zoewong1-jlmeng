import React, { Component } from "react";

import "../../utilities.css";
import "./SingleEntry.css";

/** 
 * @param {string} _id of entry
 * @param {string} day of entry
 * @param {string} title of entry
 * @param {string} content
 * @param {string} tag associated with entry
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

        {/* Tags that user might want to categorize entry with */}
        <div className="SingleEntry-tag">{this.props.tag}</div>
                </div>
            </div>
        )
    }
}

export default SingleEntry;