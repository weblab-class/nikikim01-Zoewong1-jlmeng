import React, { Component } from "react";
import { Link } from "@reach/router";

import {EditorState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML} from 'draft-convert';

import {get} from "../../utilities";
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
 * @param {string} colorMood
 * @param {string} jsonContent 
 * @param {string} imageName
 * @param userId
 * @param username
 */
class SingleEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            imageIncluded: false, //true if entry has image attached, false otherwise
            imageUrl: "",
        }
    }

    componentDidMount(){
        console.log(this.props.jsonContent);

        let jsonContent = JSON.parse(this.props.jsonContent);
        console.log(jsonContent);
        let state = EditorState.createWithContent(convertFromRaw(jsonContent));
        console.log(convertToHTML(state.getCurrentContent()));

        this.setState({
            imageIncluded: this.props.imageName !== "",
        });
        if (this.props.imageName !== ""){
            this.loadImage(this.props.imageName);
        } else{
            
        }

    }

    loadImage = (receivedImage=this.state.imageName) => {
        console.log(receivedImage);
        get("/api/getImage",{image: receivedImage }).then(data => {
          console.log(data);
          this.setState({ 
            imageURL: data.image,
          });
        });
    }

    render(){
        let url = "/SpecificEntry?".concat(this.props._id);

        if (this.props.viewMode){

            {/* Tags that user might want to categorize entry with */}
            let tagsList = null;
            tagsList = this.props.tags.map((tag) => (<div className="SingleEntry-tag">{tag}</div>));

            let jsonContent = JSON.parse(this.props.jsonContent);
            let preview = jsonContent.blocks[0].text;
            console.log(preview);

            return (
                <div className="u-flexRow u-flex-alignCenter u-flex-justifyCenter">
                    <Link to={url} className="SingleEntry-date" style={{ textDecoration: 'none' }}>{this.props.day}</Link>
                    <div className="SingleEntry-container">
                        <Link to={url} style={{ textDecoration: 'none' }}>
                            <h1 className="SingleEntry-title" style={{color:"#".concat(this.props.colorMood)}}>{this.props.title}</h1>
                        </Link>
                        {/* <p className="SingleEntry-content">{this.props.content}</p> */}
                        <p className="SingleEntry-content">{preview}</p>
                        {tagsList}
                    </div>
                </div>
            )
        } else{
            let dateImg = null;
            let image = null;

            if (this.state.imageIncluded){
                image = <img src={this.state.imageURL} className="SingleEntry-img"/>;
            } else{
                image = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-img" style={{backgroundColor:"#".concat(this.props.colorMood)}}>
                            <h1 className="SingleEntry-date">{this.props.day}</h1>
                        </div>;
            }

            dateImg = <Link to={url} className="item" style={{ textDecoration: 'none' }}>
                                <div className="u-flexColumn u-flex-alignCenter polaroid">
                                    {image}
                                    <div className="u-flex u-flex-justifyCenter SingleEntry-titleContainer">
                                        <div className="SingleEntry-viewTitle" style={{color:"#".concat(this.props.colorMood)}}>{this.props.title}</div>
                                    </div>
                                </div>
                            </Link>;

            return (
                <div className="u-flexColumn u-flex-justifyCenter">
                    {dateImg}
                    {/* <Link to={url} className="SingleEntry-viewTitle" style={{ textDecoration: 'none', color:"#".concat(this.props.colorMood)}}>{this.props.title}</Link> */}
                </div>
            )
        }
    }
}

export default SingleEntry;