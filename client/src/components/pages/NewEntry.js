import React, { Component } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


import "./NewEntry.css";
import moment from "moment";
import Creatable from 'react-select/creatable';
import { get, post } from "../../utilities";
import Webcam from "react-webcam";
import HeartRateContainer from "../modules/HeartRateContainer.js";

import {EditorState, RichUtils, convertToRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from "draft-convert";
import { redirectTo } from "@reach/router";

const Entrystyle = {
  control: base => ({
    ...base,
    fontFamily: 'Alegreya Sans',
    backgroundColor: '#fafbf5',
    // This line disable the blue border
    boxShadow: "none",
  })
};

const numOfYears = 120;
const thisYear = new Date().getFullYear();

let yearList = new Array();
for (let i = numOfYears; i>0; i--) {
  let yr = thisYear-120+i;
  yearList.push(yr.toString());
}

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayList31 = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];

// // temporary values
// const tags = [{
//         value: 'fake1',
//         label: 'School'
//     },{
//         value: 'fake2',
//         label: 'Really Good Day'
//     },{
//         value: 'fake3',
//         label: 'Read when in need of pick me up'
//     }]

// const journals = [{
//         value: 'Journal1',
//         label: 'School Journal',
//     },{
//         value: 'Journal2',
//         label: 'Work Journal',
//     }]

// const tagList = ["School","Really Good Day","Read when in need of pick me up"];
// const journalList = ['School Journal','Work Journal'];
const months = monthList.map((month) => (<option value={month}>{month}</option>));
const days31 = dayList31.map((day) => (<option value={day}>{day}</option>));
const days30 = dayList31.filter((day) => (parseInt(day,10) < 31)).map((day) => (<option value={day}>{day}</option>));
const days29 = dayList31.filter((day) => (parseInt(day,10) < 30)).map((day) => (<option value={day}>{day}</option>));
const days28 = dayList31.filter((day) => (parseInt(day,10) < 29)).map((day) => (<option value={day}>{day}</option>));
const years = yearList.map((year) => (<option value={year}>{year}</option>));
// const journals = journalList.map((journal) => (<option value={journal}>{journal}</option>));
let days = days31;


class NewEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            day: moment().format("D"),
            colorMood: null,
            title: null,
            content: "",
            jsonContent: null,
            editorState: EditorState.createEmpty(),
            saved: false, 
            tags: [],
            imageURL: "",
            imageName: "",
            heartrates: [],
            userTags: [],
        }
    }

    componentDidMount() {
      // if (this.props.userId) {
      //   this.loadImage();
      // };
      document.title="Create a new entry!";
      get("/api/tags",{user_id:Object(this.props.userId)}).then((tags) => {
        console.log(tags);
        this.setState({userTags: tags.map((tag) => {return this.createOption(tag)})});
      })
    }

  componentDidUpdate(prevProps, prevState){
      if (this.state.saved){
        console.log("Create Entry toggle");
        this.setState({saved:false,});
      };
      if (prevProps.userId !== this.props.userId && this.props.userId) {
        // just logged in. reload images
        this.loadImage();
      }
    
    }
    createOption = (label) => ({
      label,
      value: label.toLowerCase().replace(/\W/g, ''),
    });

    refreshPage = () => {
      // window.location = window.location;
      window.location.reload();
    }

    // Functions to control images //

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

  changeMonth = (event) => {
    this.setState({month: event.target.value});
    if (["January", "March","May","July","August","October","December"].includes(event.target.value)){ 
        days = days31;
    } else if (event.target.value === "February"){
        days = (this.state.year % 4 === 0 ) ? days29 : days28;
    } else{
        days = days30;
    }
  }
  changeDay = (event) => {this.setState({day: event.target.value});}
  changeYear = (event) => {
      this.setState({year: event.target.value});
      if (this.state.month === "February"){
          days = event.target.value % 4 === 0 ? days29 : days28;
      }
    }
  changeTitle = (event) => {this.setState({title: event.target.value});}
  changeColor = (newColor, mood) => {
    this.setState({colorMood: newColor});
    console.log('mood is', mood);
  }
  changeTag = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.groupEnd();
    if (newValue === null){
      this.setState({tags: []});
    }
    else{
      const temp = (newValue).map((val) => (val.label));
      console.log(temp);
      this.setState({tags: temp,});
    }
  };
  changeEditorState = (state) => {
    console.log("Called editorStateChange");
    let currentContent = state.getCurrentContent();
    console.log(currentContent.getPlainText());
    console.log(JSON.stringify(convertToRaw(currentContent)));
    console.log(convertToHTML(currentContent))
    this.setState({
      editorState: state,
      content: currentContent.getPlainText(),
      jsonContent: JSON.stringify(convertToRaw(currentContent)),
    });
  }

  goToAll = () => {
    window.location.assign('/AllEntries');
  }

  addEntry = () => {
    if (this.state.title === null){
      alert("Your journal entry needs a title!");
    } else if (this.state.content === null){
      alert("You still need to type the content of this journal entry!");
    } else if (this.state.colorMood === null){
      alert("You still have to choose a color Mood for this journal entry!");
    } else{
      alert("Congratulations");
      // this.refreshPage();
      this.goToAll();
      console.log("Submitted Entry");

      let newTags = this.state.userTags.map(userTag => (userTag.label));
      console.log(newTags);
      this.state.tags.forEach(tag => {
        let temp = this.state.userTags.find(userTag => userTag.label === tag);
        if (!temp){ newTags = [...newTags, tag];}
      });
      console.log(newTags);

      post("/api/entries",{
          user_id: this.props.userId,
          title: this.state.title,
          month: this.state.month,
          year: this.state.year,
          day: this.state.day,
          content: this.state.content,
          jsonContent: this.state.jsonContent,
          colorMood: this.state.colorMood,
          tags: this.state.tags,
          creationDate: new Date(),
          heartRateData: document.getElementById("hrArray").textContent,
          timeHRData: document.getElementById("timeArray").textContent,
          avgHR: document.getElementById("avgHR").textContent,
          imageName: this.state.imageName,
      })
      post("/api/tags", {newTags:newTags});
    }
  
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.changeEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }
      
    render(){
      console.log("The title is ", this.state.title);
      console.log("Current Input: ", this.state.content);
      console.log('Currently set mood color is', this.state.colorMood);
      console.log(this.state.tags);
      
      let deleteButton = null;
      let image = null;

      if (this.state.imageURL !== ""){
        deleteButton = <button type="button" onClick={this.deleteImage}>X</button>;
        image = <div className="NewEntry-images">
                  <img src={this.state.imageURL} className="NewEntry-img"/>
                </div>;
      }

      return (
      <>  
        <div className="NewEntry-entirety">
          <div className="NewEntry-backCover">
            <div className="NewEntry-clasp"/>
            <div className="NewEntry-rightpage">
              {/* date [start] */}
              <div className = "NewEntry-date">
                <div className="NewEntry-dropdownButton">
                  <select className="NewEntry-selectContent" value={this.state.month} onChange={this.changeMonth}>{months}</select>
                </div>
                <div className="NewEntry-dropdownButton">
                  <select className="NewEntry-selectContent" value={this.state.day} onChange={this.changeDay}>{days}</select>
                </div>
                <div className="NewEntry-dropdownButton">
                  <select className="NewEntry-selectContent" value={this.state.year} onChange={this.changeYear}>{years}</select>
                </div>
              </div>
        
              {/* date [end] */}

              {/* title [start] */}
              <div className="NewEntry-titleBox">
                <input className="NewEntry-title" placeholder='Title (max 50 characters)' onChange={this.changeTitle} maxLength="50"></input>
              </div>
              {/* title [end] */}

              {/* text area [start] */}
              <div className="NewEntry-contentBox">
                <Editor
                  editorState={this.state.editorState}
                  editorStyle={{ overflow: scroll}, {height: "60vh"}, {padding:"0% 3%"}, {maxHeight: "60vh"}}
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
                  onEditorStateChange={this.changeEditorState}/>
              </div>   
              {/* text area [end] */}
            </div>
          </div>

          {/* save button [start] */}
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Save Me!">
            <button className="NewEntry-saveButton" onClick={this.addEntry}>
              <img className="NewEntry-bookmark" src={"https://storage.googleapis.com/tagheart/saveBookmark.svg"}></img>
            </button>
          </Tooltip>
          {/* save button [end] */}

          {/* frontcover [start] */}
          <div className="NewEntry-frontCover">
            {/* whitepage left [start] */}
            <div className="NewEntry-leftpage u-flex u-flexColumn" style={{alignContent: "center"}}>
              <div className="u-flexColumn u-flex-alignCenter">
                <div style={{alignContent: "center", width: "500"}}>
                  {/* <HeartMonitor className="NewEntry-HeartMonitor" style={{height:"5vw", width:"10vw"}}/> */}
                  <HeartRateContainer/>
                </div>

              </div>
  

              {/* gcp [start] */}
              <div className="NewEntry-imageControls">
                {/* <label htmlFor="fileInput">Click to add an image </label> */}
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Pics say 1000 words...">
                  <input className="NewEntry-uploadImage" type="file" id="default" name="default" accept="image/*" onChange={this.uploadImage} style={{fontSize:"16px"}}/>
                </Tooltip>
                {deleteButton}
              </div>
              {image}
              {/* gcp [end] */}

              {/* tags [start] */}
              <Creatable
                className="NewEntry-tagsBar"
                styles={Entrystyle}
                components={{
                  IndicatorSeparator: () => null}}
                isMulti
                isClearable
                onChange={this.changeTag}
                options = {this.state.userTags}
                placeholder='Tag(s)'
              />
              {/* tags [end] */}

              {/* moods [start] */}
              <div className="NewEntry-moods ">
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="HAPPY HAPPY SUNSHINE!!!"><div className={this.state.colorMood === "FFD300" ? "btnHappyActive btnHappy" : "btnHappy"} onClick={() => this.changeColor("FFD300", 'Happy')}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="LOL AHAHA LMAO ROFL BWAHAHA"><div className={this.state.colorMood === "965AEA" ? "btnLaughActive btnLaugh" : "btnLaugh"} onClick={() => this.changeColor("965AEA", 'Laugh')}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="mwuah teehee"><div className={this.state.colorMood === "F173D2" ? "btnKissActive btnKiss" : "btnKiss"} onClick={() => this.changeColor("F173D2", 'Kiss')}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="hehe smiles *^-^*"><div className={this.state.colorMood === "0BB5FF" ? "btnSmileActive btnSmile" : "btnSmile"} onClick={() => this.changeColor("0BB5FF", 'Smile')}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="huh? omg!"><div className={this.state.colorMood === "FEC085" ? "btnSurpriseActive btnSurprise" : "btnSurprise"} onClick={() => this.changeColor("FEC085", "Surprise")}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ugh"><div className={this.state.colorMood === "9A6A44" ? "btnUghActive btnUgh" : "btnUgh"} onClick={() => this.changeColor("9A6A44", "Ugh")}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="meh"><div className={this.state.colorMood === "717D7E" ? "btnMehActive btnMeh" : "btnMeh"} onClick={() => this.changeColor("717D7E", "Meh")}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Dead Tired..."><div className={this.state.colorMood === "000000" ? "btnDeadActive btnDead" : "btnDead"} onClick={() => this.changeColor("000000", 'Dead')}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="blEhHh sICk"><div className={this.state.colorMood === "54C452" ? "btnSickActive btnSick" : "btnSick"} onClick={() => this.changeColor("54C452", "Sick")}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="sniffle sniffle tears... sadness..."><div className={this.state.colorMood === "6BA0FC" ? "btnTearsActive btnTears" : "btnTears"} onClick={() => this.changeColor("6BA0FC", "Tears")}></div></Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ANGGERRYYY"><div className={this.state.colorMood === "E35B5B" ? "btnMadActive btnMad" : "btnMad"} onClick={() => this.changeColor("E35B5B", "Mad")}></div></Tooltip>
              </div>
              {/* moods [end]*/}

            </div> {/* whitepage left [end] */}
          </div> {/* front cover [end] */}
        </div>
      </>
      )
    };
}

export default NewEntry;