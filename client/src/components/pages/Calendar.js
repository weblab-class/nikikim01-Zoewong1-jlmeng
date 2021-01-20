import React, { Component } from "react";
import moment from "moment";
import "./Calendar.css";


class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
            month: moment(),

        };

    }

    

    render () {
        let weekDays = moment.weekdaysShort();

        return (
            <>
            <div className="Calendar-frame">
                
            </div>
            </>
        );
    }
}




export default Calendar;