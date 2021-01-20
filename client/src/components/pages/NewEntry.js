import React, { Component } from "react";
import "./NewEntry.css";
import EnterEntry from "../modules/EnterEntry.js";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class NewEntry extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="NewEntry-background NewEntry-split">
                <div className="NewEntry-journal">
                    <div className="NewEntry-backCover">
                        <div className="NewEntry-clasp"/>
                        <div className="NewEntry-rightpage">
                            <div className="NewEntry-contentBox">
                                <Editor>
                                <textarea
                                disabled/>
                                </Editor>

                            </div>    
                        </div>
                    </div>
                    <div className="NewEntry-frontCover">
                        <div className="NewEntry-leftpage"/>
                    </div>
                    
                </div>

            </div>
        );
    }
}
export default NewEntry;