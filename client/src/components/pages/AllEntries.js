import React, { Component } from "react";
import SingleEntry from "./SingleEntry";

class AllEntries extends Component{
    constructor(props){
        super(props);
        this.state ={
            entries: [],
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <h1 className = "months">January</h1>
                <SingleEntry _id="123" title="Entry1" day="01" content="Hello" tag="school"/>
            </div>
        )
    }
}

export default AllEntries;