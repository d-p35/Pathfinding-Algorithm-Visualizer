import React, { useState } from "react";
import { useEffect } from "react";

import "./PathfindingVisualizer.css";
import Box from "./Box";

function PathfindingVisualizer() {

    const [grid, setGrid] = useState([]);

    const getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < 2; row++) {
          const currentRow = [];
          for (let col = 0; col < 2; col++) {
            let currentNode = {
              col,
              row,
              isStart: row === 1 && col === 1,
              isFinish: row === 2 && col === 2,
            }
            currentRow.push(currentNode);
          }
          grid.push(currentRow);
        }
        return grid;
      }
    

    
    useEffect(() => {
        const grid = [];
        for (let row = 0; row < 10; row++) {
          const currentRow = [];
          for (let col = 0; col < 10; col++) {
            let currentNode = {
              col,
              row,
              isStart: row === 0 && col === 0,
              isFinish: row === 9 && col === 9,
            }
            currentRow.push(currentNode);
          }
          grid.push(currentRow);
        }
        setGrid(grid);
        // console.log(grid);
      }, []);

    return (
        <div className="grid">
            {
                grid.map((row, rowIdx) => {
                  
                  return(
                    <div key={rowIdx}>
                    {row.map((box, boxIdx) => {
                      const {isFinish, isStart} = box;
                      const color = isFinish ? "red" : isStart ? "green" : "";
                      return(
                    <Box
                      key={boxIdx}
                      color={color}
                      isStart={isStart}
                      isFinish={isFinish}
                    />
                      );
                })}
                    </div>
                  );
            })}
        </div>
    );
}

export default PathfindingVisualizer;