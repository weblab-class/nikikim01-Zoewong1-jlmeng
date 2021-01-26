import React, { Component } from "react";
import "./MoodButton.css";


class MoodButton extends Component {
    constructor(props) {
        super(props); //color
    }

    componentDidMount() {

    }

    render(){

        <div className="NewEntry-moods ">
                  <div className="btnHappy" onClick={() => this.changeColor("FFD300", 'Happy')}></div>
                  <div className="btnLaugh" onClick={() => this.changeColor("965AEA", 'Laugh')}></div>
                  <div className="btnKiss" onClick={() => this.changeColor("F173D2", 'Kiss')}></div>
                  <div className="btnSmile" onClick={() => this.changeColor("0BB5FF", 'Smile')}></div>
                  <div className="btnSurprise" onClick={() => this.changeColor("FEC085", "Surprise")}></div>
                  <div className="btnUgh" onClick={() => this.changeColor("9A6A44", "Ugh")}></div>
                  <div className="btnMeh" onClick={() => this.changeColor("717D7E", "Meh")}></div>
                  <div className="btnDead" onClick={() => this.changeColor("000000", 'Dead')}></div>
                  <div className="btnSick" onClick={() => this.changeColor("54C452", "Sick")}></div>
                  <div className="btnTears" onClick={() => this.changeColor("6BA0FC", "Tears")}></div>
                  <div className="btnMad"onClick={() => this.changeColor("E35B5B", "Mad")}></div>
        </div>
        if (this.props.selectedColor === this.props.bgColor) {
            console.log(this.props.selectedColor)
            return (
                
                <div> </div>
            )


        } else {
            return (
                <>
                <div style={CircleStyle}> </div>
                </>
            )
        }
    }

}

export default Circle
    