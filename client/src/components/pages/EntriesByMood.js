import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";
import { get } from "../../utilities";


import "../../utilities.css";
import "./EntriesByMood.css";
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


/**
 * @param userId
 * @param username
 */
class EntriesByMood extends Component{
    constructor(props){
        super(props);
        this.state = {
            entries:[],
            viewMode: true, //boolean 0: menu list, 1: view mode
            month:moment()
        }
    }

    componentDidMount(){
        document.title = "All Entries";

        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
        }).then((entryObjs) => {
            this.setState({entries: entryObjs});
        });
    }

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

    render(){
        let haveEntries = this.state.entries.length !== 0;
        let entriesList = null;
        if (haveEntries){
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
                    viewMode={this.state.viewMode}
                />
            });
        }

        let menuIcon = null;
        let viewIcon = null;
        let addEntryButton = null;

        if (this.state.viewMode){
            console.log("Menu List");
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-iconContainer EntriesByMood-iconSelected">
                            <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="EntriesByMood-icon"></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-iconContainer EntriesByMood-iconUnselected">
                            <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="EntriesByMood-icon" onClick={this.pressViewIcon}></img>
                        </div>;
            addEntryButton = <div className="u-flex u-flex-justifyCenter">
                                <Link to="/CreateEntry" className="EntriesByMood-addBox" style={{ textDecoration: 'none' }}>
                                    <p className="u-textCenter u-margin-s EntriesByMood-add">+ Add Entry</p>
                                </Link>
                            </div>;
            if(!haveEntries){
                console.log("No Entries!");
                entriesList = <div className="u-flexRow u-flex-justifyCenter">
                                    <div className="EntriesByMood-addBox">
                                        <p className="u-textCenter u-margin-s EntriesByMood-add" style={{"fontSize":"32px"}}>NO STORIES IN MONGODB YET! ;(</p>
                                    </div>
                                </div>;
            };
            
        } else{
            console.log("View Mode");
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-iconContainer EntriesByMood-iconUnselected">
                            <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="EntriesByMood-icon" onClick={this.pressMenuIcon}></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-iconContainer EntriesByMood-iconSelected">
                            <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="EntriesByMood-icon"></img>
                        </div>;
            addEntryButton = <div className="u-flexColumn u-flex-justifyCenter">
                                <Link to="/CreateEntry" className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-addImg" style={{ textDecoration: 'none' }}>
                                        <img src={"https://storage.googleapis.com/tagheart/plusSign.svg"} height="98px" width="98px"></img>
                                </Link>
                                <p className="u-textCenter u-margin-xs EntriesByMood-add">Add Entry</p>
                            </div>;
            if(!haveEntries){
                console.log("No Entries!");
                entriesList = <div className="u-flexColumn u-flex-justifyCenter">
                                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter EntriesByMood-addImg">
                                        <p className="u-textCenter u-margin-s EntriesByMood-add" style={{"font-size":"32px"}}>NO STORIES IN MONGODB YET! ;(</p>
                                    </div>
                                    <p className="u-textCenter u-margin-xs EntriesByMood-add">Awe man ;(</p>
                                </div>;
            };
        }

        let leftIconCode = <img src={"https://storage.googleapis.com/tagheart/leftIcon.svg"} onClick={this._decreaseMonth} className="EntriesByMood-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={"https://storage.googleapis.com/tagheart/rightIcon.svg"} onClick={this._increaseMonth} className="EntriesByMood-iconContainer" height="25px"></img>;

        return(
            <div>
                
                <div className="EntriesByMood-Header u-flexRow u-flex-alignCenter">
                    <div className="EntriesByMood-leftHeader">
                        <h1 className="u-flex u-flex-alignCenter EntriesByMood-date">
                            {leftIconCode}
                            <span>{this.state.month.format('MMMM YYYY')}</span>
                            {rightIconCode}
                        </h1>
                    </div>
                    <div className="EntriesByMood-rightHeader u-flex u-flex-alignCenter">

                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See Mood Tracker">
                        <div className="EntriesByMood-border"><Link to="/MoodTracker"><img src={"https://storage.googleapis.com/tagheart/MOOD.svg"} height="180" className="EntriesByMood-happySun"></img></Link></div>
                    </Tooltip>

                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Create New Entry!">
                        <Link to="/NewEntry"><img src={"https://storage.googleapis.com/tagheart/EditPen.svg"} className="EntriesByMood-editPen u-editPen"></img></Link>
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

export default EntriesByMood;