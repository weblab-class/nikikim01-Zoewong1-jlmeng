import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";
import { get } from "../../utilities";


import "../../utilities.css";
import "./AllEntries.css";
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import MOOD from "../../public/MOOD.svg";

const style = {
    control: base => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      
    })
  };

const moods = [{link: "https://storage.googleapis.com/tagheart/happyAndHeart.svg", color: "FFD300", mood: "Happy"},
                {link: "https://storage.googleapis.com/tagheart/laughAndHeart.svg", color: "965AEA", mood: "Laugh"},
                {link: "https://storage.googleapis.com/tagheart/kisswinkAndHeart.svg", color: "F173D2", mood: "Kiss"},
                {link: "https://storage.googleapis.com/tagheart/smileAndHeart.svg", color: "0BB5FF", mood: "Smile"},
                {link: "https://storage.googleapis.com/tagheart/surpriseAndHeart.svg", color: "FEC085", mood: "Surprise"},
                {link: "https://storage.googleapis.com/tagheart/ughAndHeart.svg", color: "9A6A44", mood: "Ugh"},
                {link: "https://storage.googleapis.com/tagheart/mehAndHeart.svg", color: "717D7E", mood: "Meh"},
                {link:"https://storage.googleapis.com/tagheart/deadAndHeart.svg", color: "000000", mood: "Dead"},
                {link: "https://storage.googleapis.com/tagheart/sickAndHeart.svg", color: "54C452", mood: "Sick"},
                {link: "https://storage.googleapis.com/tagheart/sadtearsAndHeart.svg", color: "6BA0FC", mood: "Tears"},
                {link: "https://storage.googleapis.com/tagheart/madAndHeart.svg", color: "E35B5B", mood: "Mad"},
                {link: "https://storage.googleapis.com/tagheart/xCircle.svg", color: null, mood:"None"}]

/**
 * @param userId
 * @param username
 */
class AllEntries extends Component{
    constructor(props){
        super(props);
        this.state = {
            entries:[],
            viewMode: true, //boolean 0: menu list, 1: view mode
            month:moment(),
            selectedOption: null,
            colorMood: null,
            userTags: [],
            count: 0,
            urlParam:"",
            showingDate: false,
        }
    }

    moodImgs = moods.map((mood) => {
        if (mood.mood != "None") return (<img src={mood.link} className="AllEntries-moodImgs" onClick={() => {this.changeColor(mood.color,mood.mood)}}/>);
        return <img src={mood.link} className="AllEntries-moodImgs" style={{width:"35.05px"}} onClick={() => {this.changeColor(mood.color,mood.mood)}}/>
    });

    componentDidMount(){
        document.title = "All Entries";

        get("/api/tags",{user_id:Object(this.props.userId)}).then((tags) => {
            console.log(tags);
            this.setState({userTags: tags});
        })

        const temp = window.location.href;
        let param = temp.split(window.location.pathname)[1].split("?")[1];
        console.log(param);
        let count = 0;
        let color = null;
        
        if (param){
            const paramArray = param.split("=");
            count = parseInt(paramArray[1].split("&")[0],10);
            color = paramArray[2].split("&")[0];             
        } else{
            param = "";
        }

        console.log(param);
        if (count <= 0) this._decreaseMonth(Math.abs(count),color,param);
        else this._increaseMonth(count,color,param);
    }

    componentDidUpdate(){}

    pressMenuIcon = () => {this.setState({viewMode: true})};
    pressViewIcon = () => {this.setState({viewMode: false})};

    _decrementMonth = () => {
        this.setState(
            prevState => ({ 
                month: prevState.month.subtract(1, 'month'),
                count: prevState.count - 1,
            }),
            this._filterByMonth
        );
    }

    _incrementMonth = () => {
        this.setState(
            prevState => ({ 
                month: prevState.month.add(1, 'month'),
                count: prevState.count + 1,
             }),
            this._filterByMonth
        );
    }

    _decreaseMonth = (count, newColor, param) => {
        this.setState(
            prevState => ({ 
                month: moment().subtract(count, 'month'),
                count: -count,
                colorMood: newColor,
                urlParam: param
            }),
            this._filterByMonth
        );
    }

    _increaseMonth = (count, newColor, param) => {
        this.setState(
            prevState => ({ 
                month: moment().add(count, 'month'),
                count: count,
                colorMood: newColor,
                urlParam: param,
             }),
            this._filterByMonth
        );
    }

    _filterByMonth = () => {
        console.log("Filtering Month");
        console.log(this.state.month.format("MMMM"));
        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
            colorMood: this.state.colorMood,
        }).then((entryObjs) => {
            console.log(entryObjs);
            this.setState({entries: entryObjs,});
        });
    }

    changeColor = (newColor, mood) => {
        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
            colorMood: newColor,
        }).then((entryObjs) => {
            const temp = newColor === null ? "" : "count=".concat(this.state.count.toString(),"&color=",newColor);
            this.setState({
                entries: entryObjs,
                colorMood: newColor,
                urlParam: temp,
            });
        });
        console.log('mood is', mood);
        console.log(newColor === null ? "" : "count=".concat(this.state.count.toString(),"&color=",newColor));
    }

    render(){

        let haveEntries = this.state.entries.length !== 0;
        let entriesList = null;
        let menuIcon = null;
        let viewIcon = null;

        if (!haveEntries){
            entriesList = <div className="u-flexRow u-flex-justifyCenter">
                            <div className="AllEntries-addBox">
                                <p className="u-textCenter u-margin-s AllEntries-add" style={{"fontSize":"32px"}}>You have no entries for this month yet!</p>
                            </div>
                        </div>;
        } else{
            console.log(this.state.entries);
            entriesList = this.state.entries.map((entryObj) => {
                console.log(entryObj.imageName);
                return <SingleEntry 
                    _id={entryObj._id}
                    title={entryObj.title} 
                    day={entryObj.day} 
                    content={entryObj.content} 
                    tags={entryObj.tags}
                    colorMood={entryObj.colorMood}
                    jsonContent={entryObj.jsonContent}
                    imageName={entryObj.imageName}
                    viewMode={this.state.viewMode}
                    urlParam={this.state.urlParam}
                />
            });
            
            if (this.state.viewMode){
                menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected" style={{margin:"4px 4px 4px 16px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon"></img>
                            </div>;
                viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected" style={{margin:"4px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon" onClick={this.pressViewIcon}></img>
                            </div>;
                
            } else{
                menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected" style={{margin:"4px 4px 4px 16px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon" onClick={this.pressMenuIcon}></img>
                            </div>;
                viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected" style={{margin:"4px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon"></img>
                            </div>;
            }
        }

        let leftIconCode = <img src={"https://storage.googleapis.com/tagheart/leftIcon.svg"} onClick={this._decrementMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={"https://storage.googleapis.com/tagheart/rightIcon.svg"} onClick={this._incrementMonth} className="AllEntries-iconContainer" height="25px"></img>;

        let color = this.state.colorMood !== null ? this.state.colorMood : "000000";

        return(
            <div>
                
                <div className="AllEntries-Header u-flexRow u-flex-alignCenter">
                    <div className="AllEntries-leftHeader">
                        <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                            {leftIconCode}
                            <div className="AllEntries-monthYear" onClick={this.showDateOptions}>{this.state.month.format('MMMM YYYY')}</div>
                            
                            {rightIconCode}
                            {menuIcon} {viewIcon}
                        </h1>
                    </div>
                    <div className="AllEntries-rightHeader u-flex u-flex-alignCenter">

                    <div className="dropdown">
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Click me to filter by mood!">
                            {/* <Link to={`/MoodTracker?count=${this.state.count}`}><img src={"https://storage.googleapis.com/tagheart/MOOD.svg"} className="AllEntries-MOOD" style={{color:"#".concat(color),  height:"180"}}></img></Link> */}
                            <Link to={`/MoodTracker?count=${this.state.count}`}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 891.59 209.16" className="AllEntries-MOOD"><defs></defs>
                                <path style={{fill:"#".concat(color)}} d="M746.82,241.88V41.8h42q30.19,0,47.69,6a89.32,89.32,0,0,1,34.09,19.82q31,28.26,31,74.26t-32.27,74.64q-16.2,14.27-33.95,19.83-16.59,5.56-47,5.57ZM777,213.5h13.61q20.34,0,33.82-4.27a68.79,68.79,0,0,0,24.37-14.39q22.28-20.34,22.28-53,0-32.91-22-53.39-19.83-18.27-58.44-18.27H777Z" transform="translate(-9.95 -38.04)"/>
                                {/* <polygon className="cls-1" points="165.86 1.16 61.57 1.16 110.79 157.14 165.86 1.16"/> */}
                                <polygon style={{fill:"#".concat(color)}} points="110.79 159.14 61.57 3.16 36.38 3.16 0 205.75 31.23 205.75 52.74 74.85 102.41 209.16 118.39 209.16 169.5 74.98 188.81 205.75 219.78 205.75 190.89 3.16 165.86 3.16 110.79 159.14"/>
                                <path style={{fill:"#".concat(color)}} d="M604.13,38Q560.86,38,530,68.36t-31,72.57Q499,189,533,218.69q30.84,26.81,69.58,26.82,43.81,0,74.78-30.19t30.84-73.22q0-42.88-30.71-73.48T604.13,38Z" transform="translate(-9.95 -38.04)"/>
                                <circle className="cls-2" cx="556.66" cy="73.74" r="7.5"/><circle class="cls-2" cx="630.66" cy="72.74" r="7.5"/>
                                <line className="cls-3" x1="545.14" y1="145.44" x2="642.18" y2="145.44"/>
                                <path style={{fill:"#".concat(color)}} d="M367.09,39Q323.8,39,293,69.36t-31,72.57q0,48.09,34,77.76,30.82,26.81,69.58,26.82,43.8,0,74.77-30.19t30.84-73.22q0-42.88-30.7-73.48T367.09,39Z" transform="translate(-9.95 -38.04)"/>
                                <path style={{fill:"#".concat(color)}} className="cls-3" d="M303.25,174.12a62.63,62.63,0,0,0,17.46,24.4Q340.81,216,366.06,216q28.56,0,48.74-19.68a66,66,0,0,0,15.08-21.73" transform="translate(-9.95 -38.04)"/>
                                <circle className="cls-2" cx="319.61" cy="74.74" r="7.5"/><circle class="cls-2" cx="393.61" cy="73.74" r="7.5"/>
                            </svg>
                                {/* <img src={MOOD} className="AllEntries-MOOD" style={{color:"#".concat(color),  height:"180"}}></img> */}
                            </Link>
                        </Tooltip>
                        <div className="dropdown-content">{this.moodImgs}{this.deleteMoodButton}</div>
                    </div>
                    
                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Create New Entry!">
                        <Link to="/NewEntry"><img src={"https://storage.googleapis.com/tagheart/EditPen.svg"} className="AllEntries-editPen u-editPen"></img></Link>
                    </Tooltip>

                    </div>
                </div>
                <hr style={{"borderStyle":"double", "margin":"0 16px"}}></hr>
                <div className={this.state.viewMode ? "u-flexColumn" : "u-flexRow u-flex-justifyCenter u-flexWrap"}>
                    {entriesList}
                </div>
            </div>
        )
    }
}

export default AllEntries;