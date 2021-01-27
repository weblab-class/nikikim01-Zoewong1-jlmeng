import React, { Component } from "react";
import {get, post} from "../../utilities.js"
import "./SpecificEntry.css";
import Creatable from 'react-select/creatable';
import {EditorState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from "draft-convert";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
// import Plot from 'react-plotly.js';

const style = {
  control: base => ({
    ...base,
    fontFamily: 'Alegreya Sans',
    backgroundColor: '#fafbf5',
    // This line disable the blue border
    boxShadow: "none",
  })
};

// temporary values
const tags = [{
  value: 'fake1',
  label: 'School'
},{
  value: 'fake2',
  label: 'Really Good Day'
},{
  value: 'fake3',
  label: 'Read when in need of pick me up'
}]

class SpecificEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      month: "",
      year: "",
      day: "",
      colorMood: null,
      title: null,
      content: null,
      jsonContent: null,
      editorState: EditorState.createEmpty(),
      saved: false, 
      tags: [],
      isEditing: false,
      imageName: "",
      imageURL: "",
    }
  }

  componentDidMount(){
    document.title = "Specific Entry";
    const temp = window.location.href;
    const param = temp.split(window.location.pathname)[1].split("?")[1];
    console.log(param);

    get("/api/entry",{_id:Object(param)}).then((response) => {
      console.log(response);
      this.setState({
        id: param,
        month: response[0].month,
        year: response[0].year,
        day: response[0].day,
        colorMood: response[0].colorMood,
        content: response[0].content,
        jsonContent: response[0].jsonContent,
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response[0].jsonContent))),
        title: response[0].title,
        content: response[0].content,
        tags: response[0].tags,
        imageName: response[0].imageName,
      });
      if (response[0].imageName !== "") {
        console.log("Entry has image (componentDidMount)");
        this.loadImage(response[0].imageName);
      } else{
        console.log("Entry does not have an image (componentDidMount)");
      }
    });
  }

  componentDidUpdate(){
    console.log(this.state);
    if (this.state.imageName !== "") {
      console.log("Entry has image (componentDidUpdate)");
    } else{
      console.log("Entry does not have an image (componentDidUpdate)");
    }
  }

  changeTitle = (event) => {this.setState({title: event.target.value});}
  changeTag = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.groupEnd();
    const temp = newValue.map((val) => (val.label));
    console.log(temp);
    this.setState({tags: temp,});
  };
  changeColor = (newColor, mood) => {
    this.setState({colorMood: newColor});
    console.log('mood is', mood);
  }
  changeEditorState = (state) => {
    console.log("Called editorStateChange");
    let currentContent = state.getCurrentContent();
    console.log(currentContent.getPlainText());
    console.log(JSON.stringify(convertToRaw(currentContent)));
    console.log(convertToHTML(currentContent));
    this.setState({
      editorState: state,
      content: currentContent.getPlainText(),
      jsonContent: JSON.stringify(convertToRaw(currentContent)),
    });
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.changeEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  editEntry = () => {
    if (!this.state.isEditing){
      this.setState({isEditing: true});
    } else {
      this.saveEntry()
      this.setState({isEditing: false});
    };
  }

  saveEntry = () => {
    post("/api/editEntry", {
      _id: Object(this.state.id),
      title: this.state.title,
      content: this.state.content,
      jsonContent: this.state.jsonContent,
      colorMood: this.state.colorMood,
      imageName: this.state.imageName,
      tags: this.state.tags,
    })
  }

  loadImage = (receivedImage=this.state.imageName) => {
    console.log(receivedImage);
    get("/api/getImage",{image: receivedImage }).then(data => {
      console.log(data);
      this.setState({ 
        imageURL: data.image,
        imageName: data.imageName,
      });
    });
  }

  deleteImage = () => {
    post("/api/deleteImage", {image: this.state.imageName}).then(() => {
      this.setState({
        imageURL: "",
        imageName: "",
      })
    });
  }

  uploadImage = (event) => {
    const fileInput = event.target;
    console.log(fileInput.files[0]);
    if (this.state.imageName !== ""){
      console.log("Now replacing Picture");
      this.deleteImage();
    }
    this.readImage(fileInput.files[0]).then(image => {
      fileInput.value = null;
      return post("/api/uploadImage", { image: image }).then((respObj) => {
      console.log(respObj.image);
      this.loadImage(respObj.image); 
    });
    }).catch(err => {
      console.log(err);
    });
  };


readImage = (blob) => {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => {
      if (r.error) {
        reject(r.error.message);
        return;
      } else if (r.result.length < 50) {
        // too short. probably just failed to read, or ridiculously small image
        reject("small image? or truncated response");
        return;
      } else if (!r.result.startsWith("data:image/")) {
        reject("not an image!");
        return;
      } else {
        resolve(r.result);
      }
    };
    r.readAsDataURL(blob);
  });
};

  render() {
    console.log(this.state.month);
    console.log(this.state.day);

    let titleBox = null;
    let contentBox = null;
    let moodBox = null;
    let tagsBar = null;
    let imageBox = null;
    let deleteButton = null;
    let tagsList = null;

    if (this.state.isEditing){
      titleBox = <input className="NewEntry-title" value={this.state.title} style={{"color":"#".concat(this.state.colorMood)}} onChange={this.changeTitle}></input>;
      contentBox = <Editor
                    editorState={this.state.editorState}
                    editorStyle={{ overflowY: scroll}, {height: "60vh"}, {padding:"0% 3%"}}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
                      'colorPicker', 'link', 'embedded', 'emoji', 'image','history'],
                      inline: {
                        options: ['bold', 
                                  'italic', 
                                  'underline', 
                                  'strikethrough',
                                ],
                        bold: { className: 'bordered-option-classname' },
                        italic: { className: 'bordered-option-classname' },
                        underline: { className: 'bordered-option-classname' },
                        strikethrough: { className: 'bordered-option-classname' },
                        code: { className: 'bordered-option-classname' },
                      },}}
                    placeholder="Today was an amazing day! I..."
                    handleKeyCommand={this.handleKeyCommand}
                    onEditorStateChange={this.changeEditorState}/>;
        tagsBar = <Creatable
                    className="SpecificEntry-tagsBar"
                    value={this.state.tags}
                    styles={style}
                    components={{
                      IndicatorSeparator: () => null}}
                    isMulti
                    isClearable
                    onChange={this.changeTag}
                    options = {tags}
                    placeholder='Tag(s)'
                  />;
        moodBox = <div className="SpecificEntry-moods " style={{padding:"8px"}}>
                    <div className="btnHappy" onClick={() => this.changeColor("FFD300", 'Happy')}></div>
                    <div className="btnLaugh" onClick={() => this.changeColor("965AEA", 'Laugh')}></div>
                    <div className="btnKiss" onClick={() => this.changeColor("F173D2", 'Kiss')}></div>
                    <div className="btnSmile" onClick={() => this.changeColor("0BB5FF", 'Smile')}></div>
                    <div className="btnSurprise" onClick={() => this.changeColor("FEC085", "Surprise")}></div>
                    <div className="btnUgh" onClick={() => this.changeColor("9A6A44", "Ugh")}></div>
                    <div className="btnMeh" onClick={() => this.changeColor("717D7E", "Meh")}></div>
                    <div className="btnDead" onClick={() => this.changeColor("000000", 'Dead')}></div>
                    <div className="btnSick" onClick={() => this.changeColor("54C452", "Sick")}></div>
                    <div className="btnTears" onClick={() => this.changeColor("6BA0FC", "Tears")}></div>
                    <div className="btnMad"onClick={() => this.changeColor("E35B5B", "Mad")}></div>
                  </div>;
        let link = (this.state.imageName !== "") ? this.state.imageURL : "https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg";
        deleteButton = (this.state.imageName !== "") ? <button type="button" onClick={this.deleteImage}>X</button> : null;
        imageBox = <div className="u-flex u-flex-alignCenter u-flex-alignCenter SpecificEntry-entryImage" style={{backgroundColor:"#B8D4FF"}}>
                      <label for="file-input">
                        <img src={link} style={{margin:"32px 28px 32px 32px", width:"87px"}}/>
                      </label>
                      <input id="file-input" type="file" style={{display:"none"}} onChange={this.uploadImage}/>
                      {deleteButton}
                    </div>;
    } else{
      titleBox = <h1 className="SpecificEntry-entryTitle" style={{"color":"#".concat(this.state.colorMood), display:"inline-block"}}>{this.state.title}</h1>;
      contentBox = <Editor
                    editorState={this.state.editorState}
                    editorStyle={{ overflowY: scroll}, {height: "60vh"}, {padding:"0% 3%"}}
                    toolbarStyle={{display:"none"}}
                    readOnly/>;
      if (this.state.imageName !== "") imageBox = <img src={this.state.imageURL} className="SpecificEntry-entryImage"></img>;
      tagsList = this.state.tags.map((tag) => (<div className="SingleEntry-tag">{tag}</div>));
    }

    return (
        <>

       
        <div className="NewEntry-entirety">
          <div className="NewEntry-backCover">
            <div className="NewEntry-clasp"/>
            <div className="NewEntry-rightpage">
            
            </div>
          </div>


          <div className="u-flexColumn u-flex-alignCenter ">
            <div className="u-flexRow  SpecificEntry-dateBox" style={{backgroundColor:"#".concat(this.state.colorMood)}}>
                <div className="u-flexRow SpecificEntry-firstHalf">
                    <p className="SpecificEntry-month">{this.state.month}</p>
                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter SpecificEntry-circle">
                      <p className="SpecificEntry-day" style={{"color":"#".concat(this.state.colorMood)}}>{this.state.day}</p>
                    </div>
                </div>
                  <p className="SpecificEntry-year">{this.state.year}</p>
            </div>
            <div className="SpecificEntry-entryBox">
                {titleBox} {tagsList}
                {contentBox}
              
            </div>
           
        <img src={"https://storage.googleapis.com/tagheart/editIcon.svg"} className="SpecificEntry-editIcon" onClick={this.editEntry}></img>
        


          {/* frontcover [start] */}
          <div className="NewEntry-frontCover">
            {/* whitepage left [start] */}
            <div className="NewEntry-leftpage u-flex u-flexColumn">
              
                {imageBox}

                {/* heart rate stuff [start] */}
                <div className="SpecificEntry-heartRateWrapper">
                  <div className="SpecificEntry-heartRate">
                    <p style={{textAlign:"center"}}>Heart Rate Here</p>
                  </div>
                  <div className="SpecificEntry-Analysis">
                  <p style={{textAlign:"center"}}>Analysis Here</p>
                  </div>
                </div>
                {/* heart rate stuff [end] */}
            {tagsBar}
            {moodBox}
        </div>
          
              
            </div> {/* whitepage left [end] */}
          </div> {/* front cover [end] */}
        </div>
      </>
    );
  }
}

export default SpecificEntry;
