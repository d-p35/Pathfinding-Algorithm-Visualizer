import React, {useEffect, useState} from "react";
import "./Box.css";

function Box(props) {

    // const [isFinish, setIsFinish] = useState(false);
    // const [isStart, setIsStart] = useState(false);

    const [classNameForColor, setClassNameForColor] = useState(props.isFinish ? "box-finish" : props.isStart ? "box-start" : "");

    // let classNameForColor = "";
    // useEffect(() => {
        
    // },[]);


    
    return(
        <div className="box" style={{backgroundColor: props.color}}>
    {/* {console.log(props)} */}
        </div>
    );
}

export default Box;

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};