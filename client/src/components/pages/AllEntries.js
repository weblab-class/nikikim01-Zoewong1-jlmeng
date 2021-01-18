import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleEntry from "../modules/SingleEntry.js";

// import images
import menuListIcon from "../../public/images/menuListIcon.svg";
import viewModeIcon from "../../public/images/viewModeIcon.svg";
import plusSign from "../../public/images/plusSign.svg";
import leftIcon from "../../public/images/leftIcon.svg";
import rightIcon from "../../public/images/rightIcon.svg";


import "../../utilities.css";
import "./AllEntries.css";
import moment from "moment";

class AllEntries extends Component{
    constructor(props){
        super(props);
        this.state = {
            entries: [],
            viewMode: true, //boolean 0: menu list, 1: view mode
            month:moment()
        }
    }

    componentDidMount(){
        document.title = "All Entries";
    }

    pressMenuIcon = () => {this.setState({viewMode: true})};
    pressViewIcon = () => {this.setState({viewMode: false})};

    _decreaseMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.subtract(1, 'month') }),
            this._filterByMonth
        )
    }

    _increaseMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.add(1, 'month') }))
    }

    render(){
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
        }

        let leftIconCode = <img src={leftIcon} onClick={this._decreaseMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={rightIcon} onClick={this._increaseMonth} className="AllEntries-iconContainer" height="25px"></img>;

        return(
            <div>
                <div className="u-flexRow u-flex-alignCenter">
                    <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                        {leftIconCode}
                        <span>{this.state.month.format('MMMM YYYY')}</span>
                        {rightIconCode}
                    </h1>
                    {menuIcon} {viewIcon}
                </div>
                <div className={this.state.viewMode ? "u-flexColumn" : "u-flexRow u-flex-justifyCenter u-flexWrap"}>
                    <SingleEntry _id="123" title="Entry1" day="01" content="Hello" tag="school" viewMode={this.state.viewMode}/>
                    <SingleEntry _id="123" title="Entry1" day="01" content="Hello" tag="school" viewMode={this.state.viewMode}/>
                    {addEntryButton}
                </div>
            </div>
        )
    }
}

export default AllEntries;