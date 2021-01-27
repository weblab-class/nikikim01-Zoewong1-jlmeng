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


    moodOption = (props) => (
        <Option {... props}>
          <div>
          <img src={"https://storage.googleapis.com/tagheart/deadAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/happyAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/kisswinkAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/laughAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/madAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/mehAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/sadtearsAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/sickFaceAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/smileAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/surpriseAndHeart.svg"} />
          <img src={"https://storage.googleapis.com/tagheart/ughAndHeart.svg"} />
          </div>
        </Option>
      );
    

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
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected">
                            <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon"></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected">
                            <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon" onClick={this.pressViewIcon}></img>
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
                                        <p className="u-textCenter u-margin-s AllEntries-add" style={{"fontSize":"32px"}}>NO STORIES IN MONGODB YET! ;(</p>
                                    </div>
                                </div>;
            };
            
        } else{
            console.log("View Mode");
            menuIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconUnselected">
                            <img src={"https://storage.googleapis.com/tagheart/menuListIcon.svg"} className="AllEntries-icon" onClick={this.pressMenuIcon}></img>
                        </div>;
            viewIcon = <div className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-iconContainer AllEntries-iconSelected">
                            <img src={"https://storage.googleapis.com/tagheart/viewModeIcon.svg"} className="AllEntries-icon"></img>
                        </div>;
            addEntryButton = <div className="u-flexColumn u-flex-justifyCenter">
                                <Link to="/CreateEntry" className="u-flex u-flex-justifyCenter u-flex-alignCenter AllEntries-addImg" style={{ textDecoration: 'none' }}>
                                        <img src={"https://storage.googleapis.com/tagheart/plusSign.svg"} height="98px" width="98px"></img>
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

        let leftIconCode = <img src={"https://storage.googleapis.com/tagheart/leftIcon.svg"} onClick={this._decreaseMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={"https://storage.googleapis.com/tagheart/rightIcon.svg"} onClick={this._increaseMonth} className="AllEntries-iconContainer" height="25px"></img>;

        return(
            <div>
                
                <div className="AllEntries-Header u-flexRow u-flex-alignCenter">
                    <div className="AllEntries-leftHeader">
                        <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                            {leftIconCode}
                            <div className="AllEntries-monthYear" onClick={this.showDateOptions}>{this.state.month.format('MMMM YYYY')}</div>
                            {rightIconCode}
                            {/* {menuIcon} {viewIcon} */}
                        </h1>
                    </div>
                    <div className="AllEntries-rightHeader u-flex u-flex-alignCenter">

                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Click me to filter by mood!">
                        <div className="AllEntries-mood"><Link to="/MoodTracker"><img src={"https://storage.googleapis.com/tagheart/MOOD.svg"} height="180" className="AllEntries-MOOD"></img></Link></div>
                    </Tooltip>

                    {/* <Select
                       styles={style}
                       components={{
                         IndicatorSeparator: () => null
                       }}
                    //    className = "CreateEntry-dropdownButton DaysDropdown-button"
                       placeholder="MOOD IMAGE"
                       value={this.state.selectedOption}
                    //    onChange={this.handleChange}
                       options={this.moodOption}
                    /> */}



                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Create New Entry!">
                        <Link to="/NewEntry"><img src={"https://storage.googleapis.com/tagheart/EditPen.svg"} className="AllEntries-editPen u-editPen"></img></Link>
                    </Tooltip>

                    </div>
                </div>
                <hr style={{"borderStyle":"double", "margin":"0 16px"}}></hr>
                <div className={this.state.viewMode ? "u-flexColumn" : "u-flexRow u-flex-justifyCenter u-flexWrap"}>
                    {entriesList}
                
                    {/* {addEntryButton} */}
                </div>
            </div>
        )
    }
}

export default AllEntries;