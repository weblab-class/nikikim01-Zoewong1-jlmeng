import {EditorState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML} from 'draft-convert';

const typeOptions = ["unstyled", "unordered-list-item", "ordered-list-item"]

const temp = {"blocks":[
                {
                    "key":"611rt",
                    "text":"Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. ",
                    "type":"unordered-list-item",
                    "depth":0,
                    "inlineStyleRanges":[
                        {"offset":0,"length":177,"style":"color-rgb(51,51,51)"},
                        {"offset":0,"length":177,"style":"bgcolor-rgb(242,242,242)"},
                        {"offset":0,"length":177,"style":"fontfamily-Montserrat, sans-serif"},
                        {"offset":0,"length":177,"style":"fontsize-16"},
                        {"offset":0,"length":176,"style":"STRIKETHROUGH"}
                    ],
                    "entityRanges":[],
                    "data":{}
                },
                {
                    "key":"975rf",
                    "text":"Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. ",
                    "type":"ordered-list-item",
                    "depth":0,
                    "inlineStyleRanges":[
                        {"offset":0,"length":238,"style":"color-rgb(51,51,51)"},
                        {"offset":0,"length":238,"style":"bgcolor-rgb(242,242,242)"},
                        {"offset":0,"length":238,"style":"fontfamily-Montserrat, sans-serif"},
                        {"offset":0,"length":238,"style":"fontsize-16"},
                        {"offset":0,"length":238,"style":"BOLD"}
                    ],
                    "entityRanges":[],
                    "data":{}
                },
                {
                    "key":"ei3j0",
                    "text":"He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
                    "type":"ordered-list-item",
                    "depth":0,
                    "inlineStyleRanges":[
                        {"offset":0,"length":93,"style":"color-rgb(51,51,51)"},
                        {"offset":0,"length":93,"style":"bgcolor-rgb(242,242,242)"},
                        {"offset":0,"length":93,"style":"fontfamily-Montserrat, sans-serif"},
                        {"offset":0,"length":93,"style":"fontsize-16"},
                        {"offset":0,"length":92,"style":"UNDERLINE"}
                    ],
                    "entityRanges":[],
                    "data":{}}
                ],
                "entityMap":{}
            }

export function htmlParser(jsonObj, entryID){

    let html = "<div>";
    let prevType = null; // options: unstyled, unordered-list-item, ordered-list-item
    let count = 0;

    for (let i = 0; i < jsonObj.blocks.length; i++){

        let block = jsonObj.blocks[i];
        let style_id = entryID.concat(count.toString(10));
        let txt = block.text;
        let type = (block.type === "unstyled") ? "p" : ((block.type === "unordered-list-item") ? "ul" : "ol");

        if (prevType !== type){
            if (prevType === null) html = html.concat("<p>")
            else if (prevType === "unordered-list-item" || prevType === "unordered-list-item"){
                
            }
        }

        prevType = type;
        
    };

    html = html.concat("</div>");

}