import React, { Component } from "react";

import "../../utilities.css";
import "./SingleEntry.css";

/** 
 * @param {string} _id of entry
 * @param {string} day of entry
 * @param {string} title of entry
 * @param {string} content
 * @param {boolean} viewMode true if Menu List, false if view Mode
 * @param {string} tag associated with entry
*/
class SingleEntry extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    render(){
        if (this.props.viewMode){
            return (
                <div className="u-flexRow u-flex-justifyCenter">
                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-datebox">
                        <h1 className="SingleEntry-date">{this.props.day}</h1>
                    </div>
                    <div className="SingleEntry-container">
                        <h1 className="SingleEntry-title">{this.props.title}</h1>
                        <p className="SingleEntry-content">{this.props.content}</p>
                        {/* Tags that user might want to categorize entry with */}
                        <div className="SingleEntry-tag">{this.props.tag}</div>
                    </div>
                </div>
            )
        } else{
            return (
                <div className="u-flexColumn u-flex-justifyCenter">
                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-dateImg">
                        <h1 className="SingleEntry-date">{this.props.day}</h1>
                    </div>
                    <p className="SingleEntry-viewTitle">{this.props.title}</p>
                </div>
            )
        }
    }
}

export default SingleEntry;