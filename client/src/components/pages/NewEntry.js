import React, { Component } from "react";
import "./NewEntry.css";
import moment from "moment";
import Creatable from 'react-select/creatable';
import { get, post } from "../../utilities";


import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Tape from "../../public/images/Tape.svg";


const style = {
  control: base => ({
    ...base,
    border: 0,
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

const journals = [{
        value: 'Journal1',
        label: 'School Journal',
    },{
        value: 'Journal2',
        label: 'Work Journal',
    }]

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
            content: null,
            saved: false, 
            tags: [],
            images: [],

        }
    }

    componentDidMount() {
      if (this.props.userId) {
        this.loadImages();
      };
      document.title="Create a new entry!";
    }

    componentDidUpdate(){
        if (this.state.saved){
          console.log("Create Entry toggle");
          this.setState({saved:false,});
        };
        // if (prevProps.userId !== this.props.userId && this.props.userId) {
        //   // just logged in. reload images
        //   this.loadImages();
        // }
      }

      refreshPage = () => {
        // window.location = window.location;
        window.location.reload();
      }

      // Functions to control images //

      loadImages = () => {
        get("/api/getImages").then(images => {
          this.setState({ images: images });
        });
      }

  
      deleteImages = () => {
        post("/api/deleteImages").then(this.loadImages);
      }

      uploadImage = (event) => {
        const fileInput = event.target;
        console.log(fileInput);
        this.readImage(fileInput.files[0]).then(image => {
          fileInput.value = null;
          return post("/api/uploadImage", { image: image }).then(this.loadImages);
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
  changeContent = (event) => {this.setState({content: event.target.value});}
  changeColor = (newColor, mood) => {
    this.setState({colorMood: newColor});
    console.log('mood is', mood);
  }
  changeTag = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.groupEnd();
    const temp = newValue.map((val) => (val.label));
    console.log(temp);
    this.setState({tags: temp,});
    };

    addEntry = () => {

        if (this.state.title === null || this.state.content === null || this.state.colorMood === null){
          console.log(this.state.title);
          console.log(this.state.content);
          console.log(this.state.colorMood);
          alert("You are missing some information in this journal entry!");
        } else{
          alert("Congratulations");
          this.refreshPage();
          console.log("Submitted Entry");
          post("/api/entries",{
              user_id: this.props.userId,
              title: this.state.title,
              month: this.state.month,
              year: this.state.year,
              day: this.state.day,
              content: this.state.content,
              colorMood: this.state.colorMood,
              tags: this.state.tags,
              lastModDate: new Date(),
              heartRateData: [77,88],
              samplingRate: 100,
          }).then((response) => {
              console.log(response)});
          this.setState({
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
            day: moment().format("D"),
            colorMood: null,
            title: null,
            content: null,
            saved: true, 
            tags: [],
          });
        }
    
      };
      
    

    render(){
      console.log("The title is ", this.state.title);
      console.log("Current Input: ", this.state.content);
      console.log('Currently set mood color is', this.state.colorMood);
        return (
            <div className="NewEntry-background NewEntry-split">
                <div className="NewEntry-journal">
                    <div className="NewEntry-backCover">
                        <div className="NewEntry-clasp"/>
                        <div className="NewEntry-rightpage">
                              <div className = "NewEntry-date u-flexRow">
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
                            <div className="NewEntry-contentBox">
                                <Editor className="NewEntry-editor">
                                <input type="text" className="NewEntry-content" overflow="auto" placeholder="Today, I..."></input>
                                </Editor>
                            </div>    
                        </div>
                    </div>
                    <div className="NewEntry-frontCover">
                          <div className="NewEntry-leftpage u-flex u-flexColumn">

                            <img src={Tape}/>

                            <div className="NewEntry-imageControls">
                              <button type="button" onClick={this.deleteImages}>
                              Scrap All Images
                              </button>
                              <label htmlFor="fileInput">Click to add an image</label>
                              <input className="NewEntry-uploadImage" type="file" name="files[]" accept="image/*" onChange={this.uploadImage} />
                              </div>
                              <div className="NewEntry-images">
                              {
                              this.state.images.map((image, index) => (
                              <img src={image} key={index} />
                              ))
                              }
                            </div>



                            <Creatable
                            className="NewEntry-creatable"
                            styles={style}
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            isMulti
                            isClearable
                            onChange={this.changeTag}
                            options = {tags}
                            placeholder='Tag(s)'
                            />

                              <div className="NewEntry-moods ">
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
                                
                              </div>

                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}
export default NewEntry;