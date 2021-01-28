import React, { Component } from "react";
import { Link } from "@reach/router";

import {EditorState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML} from 'draft-convert';

import {get, post} from "../../utilities";
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
        console.log(props);
        this.state = {
            imageIncluded: false, //true if entry has image attached, false otherwise
            imageUrl: "",
        }
    }

    componentDidMount(){
        console.log("Single Entries componentDidMount");
        let jsonContent = JSON.parse(this.props.jsonContent);
        let state = EditorState.createWithContent(convertFromRaw(jsonContent));
        console.log(this.props.imageName);
        this.loadImage(this.props.imageName)
    }

    loadImage = (receivedImage) => {
        console.log("LOADING IMAGE");
        console.log(receivedImage);
        if (receivedImage !== ""){
            get("/api/getImage",{image: receivedImage }).then(data => {
                console.log(data);
                this.setState({ 
                    imageURL: data.image,
                    imageIncluded: receivedImage !== "",
                });
            });
        } else{
            this.setState({ 
                imageURL: "",
                imageIncluded: receivedImage !== "",
            });
        }
    }

    refreshPage = () => {
        // window.location = window.location;
        window.location.reload();
      }

    deleteEntry = () => {
        const response = confirm("Do you want to delete the ".concat(this.props.title," Entry?"));
        console.log(response);
        if (response) {
            post("/api/entry",{_id: this.props._id}).then((resp) => {
                console.log(resp);
                this.refreshPage();
            })
        }
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
            console.log(this.props.imageName);

            console.log("/AllEntries?".concat(this.props.urlParam));

            return (
                <div className="u-flexRow u-flex-alignCenter u-flex-justifyCenter">
                    <Link to={url} className="SingleEntry-date" style={{ textDecoration: 'none' }}>{this.props.day}</Link>
                    <div className="SingleEntry-container">
                        <div className="u-flex" style={{justifyContent:"space-between", alignItems:"flex-start"}}>
                            <Link to={url} style={{ textDecoration: 'none' }}>
                                <h1 className="SingleEntry-title" style={{color:"#".concat(this.props.colorMood)}}>{this.props.title}</h1>
                            </Link>
                            {/* <Link to={"/AllEntries?".concat(this.props.urlParam)}> */}
                                <button type="button" onClick={this.deleteEntry} style={{backgroundColor:"transparent", border: "None"}}>X</button>
                                {/* </Link> */}
                        </div>
                        {/* <p className="SingleEntry-content">{this.props.content}</p> */}
                        <p className="SingleEntry-content">{preview}</p>
                        {tagsList}
                    </div>
                </div>
            )
        } else{
            let dateImg = null;
            let image = null;

            console.log(this.props.imageName);
         

            if (this.state.imageIncluded){
                image = <img key={Date.now()} src={this.state.imageURL} className="SingleEntry-img"/>;
            } else{
                image = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SingleEntry-img" style={{backgroundColor:"#".concat(this.props.colorMood)}}>
                            <h1 className="SingleEntry-date">{this.props.day}</h1>
                        </div>;
            }

            dateImg = <div className="u-flex u-flexColumn u-flex-itemsEnd" ><Link to={url} className="item" style={{ textDecoration: 'none' }}>
                                <div className="u-flexColumn u-flex-alignCenter polaroid">
                                    {image}
                                    <div className="u-flex u-flex-justifyCenter SingleEntry-titleContainer">
                                        <div className="SingleEntry-viewTitle" style={{color:"#".concat(this.props.colorMood)}}>{this.props.title}</div>
                                        
                                    </div>
                                </div>
                            </Link>
                            <button type="button" onClick={this.deleteEntry} style={{backgroundColor:"transparent", border: "None", height: "30px", width: "30px", position: 'absolute',}}>X</button>
                            </div>;

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