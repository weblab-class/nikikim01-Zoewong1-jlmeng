import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";
import { get } from "../../utilities";

// import images
import menuListIcon from "../../public/images/menuListIcon.svg";
import viewModeIcon from "../../public/images/viewModeIcon.svg";
import plusSign from "../../public/images/plusSign.svg";
import leftIcon from "../../public/images/leftIcon.svg";
import rightIcon from "../../public/images/rightIcon.svg";
import HappySun from "../../public/images/HappySun.svg";
import EditPen from "../../public/images/EditPen.svg";


import "../../utilities.css";
import "./AllEntries.css";
import moment from "moment";


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

        // For Testing Purposes 
        // this.setState({entries: [{
        //     _id:"123",
        //     journal:"Private",
        //     title:"Entry1",
        //     month:"January",
        //     day:"01",
        //     content:"Hello",
        //     tags:["school","math"],
        // }]});

        get("/api/entries",{
            month:this.state.month.format("MMMM"), 
            year:this.state.month.format("YYYY"), 
            user_id:Object(this.props.userId),
            // journal:this.state.journal,
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
            journal:this.state.journal
        }).then((entryObjs) => {
            this.setState({entries: entryObjs});
        });
    }

    render(){
        let haveEntries = this.state.entries.length !== 0;
        let entriesList = null;
        if (haveEntries){
            entriesList = this.state.entries.map((entryObj) => (
                <SingleEntry 
                    _id={entryObj._id}
                    title={entryObj.title} 
                    day={entryObj.day} 
                    content={entryObj.content} 
                    tags={entryObj.tags}
                    colorMood={entryObj.colorMood}
                    viewMode={this.state.viewMode}
                />
            ));
        }

        let menuIcon = null;
        let viewIcon = null;
        let addEntryButton = null;

        if (this.state.viewMode){
            console.log("Menu List");
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected">
                            <img src={menuListIcon} className="AllEntries-icon"></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected">
                            <img src={viewModeIcon} className="AllEntries-icon" onClick={this.pressViewIcon}></img>
                        </div>;
            addEntryButton = <div className="u-flex u-flex-justifyCenter">
                                <Link to="/CreateEntry" className="AllEntries-addBox" style={{ textDecoration: 'none' }}>
                                    <p className="u-textCenter u-margin-s AllEntries-add">+ Add Entry</p>
                                </Link>
                            </div>;
            if(!haveEntries){
                console.log("No Entries!");
                entriesList = <div className="u-flexRow u-flex-justifyCenter">
                                    <div className="AllEntries-addBox">
                                        <p className="u-textCenter u-margin-s AllEntries-add" style={{"font-size":"32px"}}>NO STORIES IN MONGODB YET! ;(</p>
                                    </div>
                                </div>;
            };
            
        } else{
            console.log("View Mode");
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected">
                            <img src={menuListIcon} className="AllEntries-icon" onClick={this.pressMenuIcon}></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected">
                            <img src={viewModeIcon} className="AllEntries-icon"></img>
                        </div>;
            addEntryButton = <div className="u-flexColumn u-flex-justifyCenter">
                                <Link to="/CreateEntry" className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-addImg" style={{ textDecoration: 'none' }}>
                                        <img src={plusSign} height="98px" width="98px"></img>
                                </Link>
                                <p className="u-textCenter u-margin-xs AllEntries-add">Add Entry</p>
                            </div>;
            if(!haveEntries){
                console.log("No Entries!");
                entriesList = <div className="u-flexColumn u-flex-justifyCenter">
                                    <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-addImg">
                                        <p className="u-textCenter u-margin-s AllEntries-add" style={{"font-size":"32px"}}>NO STORIES IN MONGODB YET! ;(</p>
                                    </div>
                                    <p className="u-textCenter u-margin-xs AllEntries-add">Awe man ;(</p>
                                </div>;
            };
        }

        let leftIconCode = <img src={leftIcon} onClick={this._decreaseMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={rightIcon} onClick={this._increaseMonth} className="AllEntries-iconContainer" height="25px"></img>;

        return(
            <div>
                
                <div className="AllEntries-Header u-flexRow u-flex-alignCenter">
                    <div className="AllEntries-leftHeader">
                        <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                            {leftIconCode}
                            <span>{this.state.month.format('MMMM YYYY')}</span>
                            {rightIconCode}
                            {/* {menuIcon} {viewIcon} */}
                        </h1>
                    </div>
                    <div className="AllEntries-rightHeader u-flex u-flex-alignCenter">
                    <Link to="/MoodTracker"><img src={HappySun} height="180" className="AllEntries-happySun"></img></Link>
                    <Link to="/NewEntry"><img src={EditPen} className="AllEntries-editPen u-editPen"></img></Link>
                    </div>
                </div>
                <hr style={{"border-style":"double", "margin":"0 16px"}}></hr>
                <div className={this.state.viewMode ? "u-flexColumn" : "u-flexRow u-flex-justifyCenter u-flexWrap"}>
                    {entriesList}
                    {/* {addEntryButton} */}
                </div>
            </div>
        )
    }
}

export default AllEntries;