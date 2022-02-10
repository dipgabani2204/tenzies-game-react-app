import React from "react";
import Dice from "./Dice";

// import nanoid which is used when Dice component is called with unique id...
import { nanoid } from 'nanoid';

export default function Main() {

    // allNewDice() function is used for generating random values between 1 to 6 and return an array of object of size 10....
    function allNewDice() {
        let resultArr = []
        for (let i = 0; i < 10; i++) {
            let theRandomNumber = Math.floor(Math.random() * 6) + 1;
            resultArr.push({
                value: theRandomNumber,
                isHeld: false,
                id: nanoid()
            });
        }
        return resultArr;
    }

    //make state variable diceValue which initialize with calling allNewDice() function value...
    const [diceValue, setDiceValue] = React.useState(allNewDice())

    //make the boolean variable state which store false...
    const [wonTheGame, setWonTheGame] = React.useState(false)



    //use the useEffect() to check that if game is won or not....
    React.useEffect(() => {
        const allHeld = diceValue.every(die => die.isHeld)
        const firstValue = diceValue[0].value
        const allSameValue = diceValue.every(die => die.value === firstValue)

        //if all the hold is true and value for all dice are same then set wonthegame to true...
        if (allHeld && allSameValue) {
            setWonTheGame(true)
        }

        // this useEffect run whenever the value of the diceValue variable is changed...
    }, [diceValue])



    //hold() function to prevent the change the isHeld variable....
    function hold(ID) {
        setDiceValue(oldValue => {
            return oldValue.map(val => {
                return val.id === ID ? {
                    ...val,
                    isHeld: !val.isHeld
                } : val
            })
        })
    }


    //convert the simple component Dice to JSX syntax...
    const diceElements = diceValue.map(dice => {
        return <Dice
            value={dice.value}
            isHeld={dice.isHeld}
            key={dice.id}
            id={dice.id}
            hold={hold}
            changeValues={changeValues}
        />
    })


    //when button is clicked, change those values which haven't hold...
    function changeValues() {

        const newArr = allNewDice()
        setDiceValue((oldValue) => {
            let count = -1;
            return oldValue.map(data => {
                count = count + 1;
                return data.isHeld === true ? { ...data } : { ...data, value: newArr[count].value }
            })
        })
    }

    //function for restarting the game...
    function restartGame()
    {
        setDiceValue(allNewDice())
        setWonTheGame(false)
    }

    //return the below JSX...
    return (
        <div className="container">
            <div className="content-div">
                <h4 className="title">Tenzies</h4>
                <p className="rules">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="all-nums">
                    {diceElements}
                </div>
                <div className="btn-div">
                    {!wonTheGame && <button onClick={changeValues}>Roll</button>}
                    {wonTheGame && <button onClick={restartGame}>New Game</button>}
                </div>
            </div>
        </div>
    )
}