import React, { useState } from "react";
import { useEffect } from "react";

import "./PathfindingVisualizer.css";
import Box from "./Box";

function PathfindingVisualizer() {

    const [grid, setGrid] = useState([]);

    const getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < 15; row++) {
          const currentRow = [];
          for (let col = 0; col < 50; col++) {
            currentRow.push([]);
          }
          grid.push(currentRow);
        }
        return grid;
      }
    

    
    useEffect(() => {
        setGrid(getInitialGrid());
      });

    return (
        <div className="grid">
            {
                grid.map((row, rowIdx) => {
                  return(
                    row.map((node, nodeIdx) => <Box></Box>)
                  );
            })};
        </div>
    );
}

export default PathfindingVisualizer;