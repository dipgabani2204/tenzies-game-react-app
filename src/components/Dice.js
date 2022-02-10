import React from "react";

export default function Dice(props) {

    //change the background color as per the isHeld property...
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }

    return (

        //call the hold() function which is written in the App.js file and pass the props.id to this function...
        <div className="nums" style={styles} onClick={() => props.hold(props.id)} >
            <span className="selected">{props.value}</span>
        </div>
    )
}