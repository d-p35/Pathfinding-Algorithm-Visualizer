import React, {useEffect, useState} from "react";
import "./Box.css";

function Box(props) {

    // const [isFinish, setIsFinish] = useState(false);
    // const [isStart, setIsStart] = useState(false);

    const [classNameForColor, setClassNameForColor] = useState(props.isFinish ? "box-finish" : props.isStart ? "box-start" : "");

    const {
        col,
        row,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
    } = props;
    
    // let classNameForColor = "";
    // useEffect(() => {
        
    // },[]);


    
    return(
        <div 
        id={`box-${row}-${col}`}
        className="box" style={{backgroundColor: props.color}}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        >
    {/* {console.log(props)} */}
        </div>
    );
}

export default Box;

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};