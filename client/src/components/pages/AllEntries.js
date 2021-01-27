import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";
import { get } from "../../utilities";


import "../../utilities.css";
import "./AllEntries.css";
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


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

        return(
            <div>
                
                <div className="AllEntries-Header u-flexRow u-flex-alignCenter">
                    <div className="AllEntries-leftHeader">
                        <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                            {leftIconCode}
                            <span>{this.state.month.format('MMMM YYYY')}</span>
                            {rightIconCode}
                            {menuIcon} {viewIcon}
                        </h1>
                    </div>
                    <div className="AllEntries-rightHeader u-flex u-flex-alignCenter">

                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="See Mood Tracker">
                        <div className="AllEntries-border"><Link to="/MoodTracker"><img src={"https://storage.googleapis.com/tagheart/MOOD.svg"} height="180" className="AllEntries-happySun"></img></Link></div>
                    </Tooltip>

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