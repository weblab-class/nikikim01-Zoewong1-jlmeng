import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";
import { get } from "../../utilities";
import Select from "react-select";


import "../../utilities.css";
import "./AllEntries.css";
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

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
        }
    }

    moodImgs = moods.map((mood) => {
        if (mood.mood != "None") return (<img src={mood.link} className="AllEntries-moodImgs" onClick={() => {this.changeColor(mood.color,mood.mood)}}/>);
        return <img src={mood.link} className="AllEntries-moodImgs" style={{width:"35.05px"}} onClick={() => {this.changeColor(mood.color,mood.mood)}}/>
    });

    componentDidMount(){
        document.title = "All Entries";

        const temp = window.location.href;
        const param = temp.split(window.location.pathname)[1].split("?")[1];
        console.log(param);
        
        const color = (param) ? param : null;

        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
            colorMood: color,
        }).then((entryObjs) => {
            this.setState({
                entries: entryObjs,
                colorMood: color,
            });
        });
    }

    componentDidUpdate(){}

    pressMenuIcon = () => {this.setState({viewMode: true})};
    pressViewIcon = () => {this.setState({viewMode: false})};

    _decreaseMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.subtract(1, 'month') }),
            this._filterByMonth
        );
    }

    _increaseMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.add(1, 'month') }),
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
        }).then((entryObjs) => {
            this.setState({entries: entryObjs});
        });
    }

    changeColor = (newColor, mood) => {
        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
            colorMood: newColor,
        }).then((entryObjs) => {
            this.setState({
                entries: entryObjs,
                colorMood: newColor
            });
        });
        console.log('mood is', mood);
    }

    render(){
        console.log(this.moodImgs);

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
            entriesList = this.state.entries.map((entryObj) => {
                console.log(entryObj);
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
                />
            });
            
            if (this.state.viewMode){
                console.log("Menu List");
                menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected" style={{margin:"4px 4px 4px 16px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon"></img>
                            </div>;
                viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected" style={{margin:"4px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon" onClick={this.pressViewIcon}></img>
                            </div>;
                
            } else{
                console.log("View Mode");
                menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected" style={{margin:"4px 4px 4px 16px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon" onClick={this.pressMenuIcon}></img>
                            </div>;
                viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected" style={{margin:"4px"}}>
                                <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon"></img>
                            </div>;
            }
        }

        let leftIconCode = <img src={"https://storage.googleapis.com/tagheart/leftIcon.svg"} onClick={this._decreaseMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={"https://storage.googleapis.com/tagheart/rightIcon.svg"} onClick={this._increaseMonth} className="AllEntries-iconContainer" height="25px"></img>;

        let color = this.state.colorMood !== null ? this.state.colorMood : "FFFFFF"
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
                            <Link to="/MoodTracker"><img src={"https://storage.googleapis.com/tagheart/MOOD.svg"} className="AllEntries-MOOD" style={{color:"#".concat(color),  height:"180"}}></img></Link>
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