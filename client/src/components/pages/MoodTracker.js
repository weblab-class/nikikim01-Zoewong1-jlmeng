import React, { Component } from "react";
import "./MoodTracker.css";
import { Link } from "@reach/router";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import {_decreaseMonth, _increaseMonth, _filterByMonth, changeColor} from "./AllEntries.js";
import moment from 'moment';
import { get } from "../../utilities";
import { each } from "jquery";


// const colorMoodsDict = [
//         {link: "https://storage.googleapis.com/tagheart/heart_FFD300.svg", color: "FFD300", mood: "Happy", name:"yellowHeart", note:"HAPPY HAPPY SUNSHINE!!!"},
//         {link: "https://storage.googleapis.com/tagheart/heart_965AEA.svg", color: "965AEA", mood: "Laugh", name:"purpleHeart", note:"LOL AHAHA LMAO ROFL BWAHAHA"},
//         {link: "https://storage.googleapis.com/tagheart/heart_F173D2.svg", color: "F173D2", mood: "Kiss", name:"pinkHeart", note:"mwuah teehee"},
//         {link: "https://storage.googleapis.com/tagheart/heart_0BB5FF.svg", color: "0BB5FF", mood: "Smile", name:"happyBlueHeart", note:"hehe smiles *^-^*"},
//         {link: "https://storage.googleapis.com/tagheart/heart_FEC085.svg", color: "FEC085", mood: "Surprise", name:"orangeHeart", note:"huh? omg!"},
//         {link: "https://storage.googleapis.com/tagheart/heart_9a6a44.svg", color: "9A6A44", mood: "Ugh", name:"brownHeart", note:"ugh"},
//         {link: "https://storage.googleapis.com/tagheart/heart_717D7E.svg", color: "717D7E", mood: "Meh", name:"greyHeart", note:"meh"},
//         {link:"https://storage.googleapis.com/tagheart/heart_000000.svg", color: "000000", mood: "Dead", name:"blackHeart", note:"Dead Tired..."},
//         {link: "https://storage.googleapis.com/tagheart/heart_54c452.svg", color: "54C452", mood: "Sick", name:"greenHeart", note:"blEhHh sICk"},
//         {link: "https://storage.googleapis.com/tagheart/heart_6BA0FC.svg", color: "6BA0FC", mood: "Tears", name:"sadBlueHeart", note:"sniffle sniffle tears... sadness..."},
//         {link: "https://storage.googleapis.com/tagheart/heart_E35B5B.svg", color: "E35B5B", mood: "Mad", name:"redHeart", note:"ANGGERRYYY"}
// ]

class MoodTracker extends Component {
    constructor(props){
        super(props);
        this.state = {
                blackHeartEntries: [],
                happyBlueHeartEntries: [],
                greenHeartEntries: [],
                redHeartEntries: [],
                greyHeartEntries: [],
                purpleHeartEntries: [],
                brownHeartEntries: [],
                pinkHeartEntries: [],
                orangeHeartEntries: [],
                yellowHeartEntries: [],
                sadBlueHeartEntries: [],

                month: moment(),
                count:0,
        }
        
    }



    componentDidMount(){
        document.title = "Mood Tracker";

        get("/api/entries",{
                month:this.state.month.format("MMMM"), 
                year:this.state.month.format("YYYY"), 
                user_id:Object(this.props.userId),
            }).then((entryObjs) => {
                this.setState({
                    entries: entryObjs,
                });
            });
    }

    _decrementMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.subtract(1, 'month') }),
            this._filterByMonth
        );
    }

    _incrementMonth = () => {
        this.setState(
            prevState => ({ month: prevState.month.add(1, 'month') }),
            this._filterByMonth
        );
    }

    _decreaseMonth = () => {
        this.setState(
            prevState => ({ 
                month: prevState.month.subtract(1, 'month'),
                count: prevState.count - 1,
        }),
            this._filterByMonth
        );
    }

    _increaseMonth = () => {
        this.setState(
            prevState => ({ 
                    month: prevState.month.add(1, 'month'),
                    count: prevState.count + 1,
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
        }).then((entryObjs) => {
                let blackHeartEntries= [];
                let happyBlueHeartEntries= [];
                let greenHeartEntries= [];
                let redHeartEntries= [];
                let greyHeartEntries= [];
                let purpleHeartEntries= [];
                let brownHeartEntries= [];
                let pinkHeartEntries= [];
                let orangeHeartEntries= [];
                let yellowHeartEntries= [];
                let sadBlueHeartEntries= [];

                entryObjs.forEach((entryObj) => {
                        if (entryObj.colorMood === "000000"){
                                blackHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "FFD300"){
                                yellowHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "965AEA"){
                                purpleHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "F173D2"){
                                pinkHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "6BA0FC"){
                                sadBlueHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "FEC085"){
                                orangeHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "9A6A44"){
                                brownHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "717D7E"){
                                greyHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "E35B5B"){
                                redHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "54C452"){
                                greenHeartEntries.push(entryObj)
                        } else if (entryObj.colorMood === "0BB5FF"){
                                happyBlueHeartEntries.push(entryObj)
                        } 
                });
                this.setState({
                        blackHeartEntries: blackHeartEntries,
                        yellowHeartEntries: yellowHeartEntries,
                        purpleHeartEntries: purpleHeartEntries,
                        pinkHeartEntries: pinkHeartEntries,
                        sadBlueHeartEntries: sadBlueHeartEntries,
                        orangeHeartEntries: orangeHeartEntries,
                        brownHeartEntries: brownHeartEntries,
                        greyHeartEntries: greyHeartEntries,
                        redHeartEntries: redHeartEntries,
                        greenHeartEntries: greenHeartEntries,
                        happyBlueHeartEntries:happyBlueHeartEntries,
                })
        });
    }


    render(){
        let blackHeartHeight = 10 * this.state.blackHeartEntries.length;
        let happyBlueHeartHeight = 10 * this.state.happyBlueHeartEntries.length;
        let greenHeartHeight = 10 * this.state.greenHeartEntries.length;
        let redHeartHeight = 10 * this.state.redHeartEntries.length;
        let greyHeartHeight = 10 * this.state.greyHeartEntries.length;
        let purpleHeartHeight = 10 * this.state.purpleHeartEntries.length;
        let brownHeartHeight = 10 * this.state.brownHeartEntries.length;
        let pinkHeartHeight = 10 * this.state.pinkHeartEntries.length;
        let orangeHeartHeight = 10 * this.state.orangeHeartEntries.length;
        let yellowHeartHeight = 10 * this.state.yellowHeartEntries.length;
        let sadBlueHeight = 10 * this.state.sadBlueHeartEntries.length;


        if (this.state.blackHeartEntries.length<=1){
                blackHeartHeight = 10;
        } else if ((this.state.blackHeartEntries.length>=10)){
                blackHeartHeight = 100;
        } else {
                blackHeartHeight = 10* this.state.blackHeartEntries.length;
        }

        if (this.state.happyBlueHeartEntries.length<=1){
                happyBlueHeartHeight = 10;
        } else if ((this.state.happyBlueHeartEntries.length>=10)){
                happyBlueHeartHeight = 100;
        } else {
                happyBlueHeartHeight = 10 * this.state.happyBlueHeartEntries.length;
        }

        if (this.state.greenHeartEntries.length<=1){
                greenHeartHeight = 10;
        } else if ((this.state.greenHeartEntries.length>=10)){
                greenHeartHeight = 100;
        } else {
                greenHeartHeight = 10 * this.state.greenHeartEntries.length;
        }

        if (this.state.redHeartEntries.length<=1){
                redHeartHeight = 10;
        } else if ((this.state.redHeartEntries.length>=10)){
                redHeartHeight = 100;
        } else {
                redHeartHeight = 10 * this.state.redHeartEntries.length;
        }

        if (this.state.greyHeartEntries.length<=1){
                greyHeartHeight = 10;
        } else if ((this.state.greyHeartEntries.length>=10)){
                greyHeartHeight = 100;
        } else {
                greyHeartHeight = 10 * this.state.greyHeartEntries.length;
        }

        if (this.state.purpleHeartEntries.length<=1){
                purpleHeartHeight = 10;
        } else if ((this.state.purpleHeartEntries.length>=10)){
                purpleHeartHeight = 100;
        } else {
                purpleHeartHeight = 10 * this.state.purpleHeartEntries.length;
        }

        if (this.state.brownHeartEntries.length<=1){
                brownHeartHeight = 10;
        } else if ((this.state.brownHeartEntries.length>=10)){
                brownHeartHeight = 100;
        } else {
                brownHeartHeight = 10 * this.state.brownHeartEntries.length;
        }

        if (this.state.pinkHeartEntries.length<=1){
                pinkHeartHeight = 10;
        } else if ((this.state.pinkHeartEntries.length>=10)){
                pinkHeartHeight = 100;
        } else {
                pinkHeartHeight = 10 * this.state.pinkHeartEntries.length;
        }

        if (this.state.orangeHeartEntries.length<=1){
                orangeHeartHeight = 10;
        } else if ((this.state.orangeHeartEntries.length>=10)){
                orangeHeartHeight = 100;
        } else {
                orangeHeartHeight = 10 * this.state.orangeHeartEntries.length;
        }

        if (this.state.yellowHeartEntries.length<=1){
                yellowHeartHeight = 10;
        } else if ((this.state.yellowHeartEntries.length>=10)){
                yellowHeartHeight = 100;
        } else {
                yellowHeartHeight = 10 * this.state.yellowHeartEntries.length;
        }

        if (this.state.sadBlueHeartEntries.length<=1){
                sadBlueHeight = 10;
        } else if ((this.state.sadBlueHeartEntries.length>=10)){
                sadBlueHeight = 100;
        } else {
                sadBlueHeight = 10 * this.state.sadBlueHeartEntries.length;
        }

        let leftIconCode = <img src={"https://storage.googleapis.com/tagheart/leftIcon.svg"} onClick={this._decreaseMonth} className="AllEntries-iconContainer" height="25px"></img>;
        let rightIconCode = this.state.month.clone().add(1, 'hour') > moment() ? null : <img src={"https://storage.googleapis.com/tagheart/rightIcon.svg"} onClick={this._increaseMonth} className="AllEntries-iconContainer" height="25px"></img>;

        
        return (
                <>
                <h1 className="u-flex u-flex-alignCenter AllEntries-date">
                        {leftIconCode}
                                <div className="AllEntries-monthYear" onClick={this.showDateOptions}>{this.state.month.format('MMMM YYYY')}</div>
                        {rightIconCode}
                        </h1>
            <div className="MoodTracker-container">
                    
                    <div className="MoodTracker-Hearts">
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Dead Tired...">
                        <Link to={`/AllEntries?count=${this.state.count}&color=000000`}><img className="MoodTracker-Heart blackHeart" src={'https://storage.googleapis.com/tagheart/heart_000000.svg'} 
                                height={`${blackHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="hehe smiles *^-^*">
                        <Link to={`/AllEntries?count=${this.state.count}&color=0BB5FF`}><img className="MoodTracker-Heart happyBlueHeart" src={'https://storage.googleapis.com/tagheart/heart_0BB5FF.svg'} 
                                height={`${happyBlueHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="blEhHh sICk">
                        <Link to={`/AllEntries?count=${this.state.count}&color=54c452`}><img className="MoodTracker-Heart greenHeart" src={'https://storage.googleapis.com/tagheart/heart_54c452.svg'} 
                                height={`${greenHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ANGGERRYYY">
                        <Link to={`/AllEntries?count=${this.state.count}&color=E35B5B`}><img className="MoodTracker-Heart redHeart" src={'https://storage.googleapis.com/tagheart/heart_E35B5B.svg'} 
                                height={`${redHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="meh">
                        <Link to={`/AllEntries?count=${this.state.count}&color=717D7E`}><img className="MoodTracker-Heart greyHeart" src={'https://storage.googleapis.com/tagheart/heart_717D7E.svg'} 
                                height={`${greyHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="LOL AHAHA LMAO ROFL BWAHAHA">
                        <Link to={`/AllEntries?count=${this.state.count}&color=965AEA`}><img className="MoodTracker-Heart purpleHeart" src={'https://storage.googleapis.com/tagheart/heart_965AEA.svg'} 
                                height={`${purpleHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="ugh">
                        <Link to={`/AllEntries?count=${this.state.count}&color=9a6a44`}><img className="MoodTracker-Heart brownHeart" src={'https://storage.googleapis.com/tagheart/heart_9a6a44.svg'} 
                                height={`${brownHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="mwuah teehee">
                        <Link to={`/AllEntries?count=${this.state.count}&color=F173D2`}><img className="MoodTracker-Heart pinkHeart" src={'https://storage.googleapis.com/tagheart/heart_F173D2.svg'} 
                                height={`${pinkHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="huh? omg!">
                        <Link to={`/AllEntries?count=${this.state.count}&color=FEC085`}><img className="MoodTracker-Heart orangeHeart" src={'https://storage.googleapis.com/tagheart/heart_FEC085.svg'} 
                                height={`${orangeHeartHeight.toString()}%`} /></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="HAPPY HAPPY SUNSHINE!!!">
                        <Link to={`/AllEntries?count=${this.state.count}&color=FFD300`}><img className="MoodTracker-Heart yellowHeart" src={'https://storage.googleapis.com/tagheart/heart_FFD300.svg'} 
                                height={`${yellowHeartHeight.toString()}%`}/></Link></Tooltip>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="sniffle sniffle tears... sadness...">
                        <Link to={`/AllEntries?count=${this.state.count}&color=6BA0FC`}><img className="MoodTracker-Heart sadBlueHeart" src={'https://storage.googleapis.com/tagheart/heart_6BA0FC.svg'} 
                                height={`${sadBlueHeight.toString()}%`}/></Link></Tooltip>
                    
                    
                </div>

            </div>
            </>
        );
    }
}

export default MoodTracker;