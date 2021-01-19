import React, { Component } from "react";
import { Link } from "@reach/router";
import samoyed from "../../public/images/samoyed.jpg";

import "../../utilities.css";
import "./SingleEntry.css";

/** 
 * Proptypes
 * @param {string} _id of entry
 * @param {string} day of entry
 * @param {string} title of entry
 * @param {string} content
 * @param {boolean} viewMode true if Menu List, false if view Mode
 * @param {string} tags associated with entry
*/
class SingleEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            imageIncluded: false, //true if entry has image attached, false otherwise
            imageUrl: "../../public/images/samoyed.jpg",
        }
    }

    componentDidMount(){}

    render(){
        let url = "/SpecificEntry?".concat(this.props._id);
        if (this.props.viewMode){

            let dateBox = null;

            if (this.state.imageIncluded){
                dateBox = <img src={samoyed}></img>

            }else{
                dateBox = <Link to={url} className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-datebox" style={{ textDecoration: 'none' }}>
                            <h1 className="SingleEntry-date">{this.props.day}</h1>
                        </Link>;
            }


            {/* Tags that user might want to categorize entry with */}
            let tagsList = null;
            tagsList = this.props.tags.map((tag) => (<div className="SingleEntry-tag">{tag}</div>));

            return (
                <div className="u-flexRow u-flex-justifyCenter">
                    {dateBox}
                    <div className="SingleEntry-container">
                        <Link to={url} style={{ textDecoration: 'none' }}>
                            <h1 className="SingleEntry-title" >{this.props.title}</h1>
                        </Link>
                        <p className="SingleEntry-content">{this.props.content}</p>
                        {tagsList}
                    </div>
                </div>
            )
        } else{
            let dateImg = null;

            if (this.state.imageIncluded){
                
            } else{
                dateImg = <Link to={url} className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-dateImg" style={{ textDecoration: 'none' }}>
                                <h1 className="SingleEntry-date">{this.props.day}</h1>
                            </Link>;
            }

            return (
                <div className="u-flexColumn u-flex-justifyCenter">
                    {dateImg}
                    <Link to={url} className="SingleEntry-viewTitle" style={{ textDecoration: 'none' }}>{this.props.title}</Link>
                </div>
            )
        }
    }
}

export default SingleEntry;