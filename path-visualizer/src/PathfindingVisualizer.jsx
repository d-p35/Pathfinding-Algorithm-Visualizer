import React, { useState } from "react";
import { useEffect } from "react";
import { dijkstra, getUnvisitedNeighbors } from "./Dijkstra";
import "./PathfindingVisualizer.css";
import Box from "./Box";

function PathfindingVisualizer() {

    const startCol = 1;
    const startRow = 2;
    const finishCol = 5;
    const finishRow = 2;

    const [grid, setGrid] = useState([]);

    // const getInitialGrid = () => {
    //     const grid = [];
    //     for (let row = 0; row < 2; row++) {
    //       const currentRow = [];
    //       for (let col = 0; col < 2; col++) {
    //         let currentNode = {
    //           col,
    //           row,
    //           isStart: row === 1 && col === 1,
    //           isFinish: row === 2 && col === 2,
    //         }
    //         currentRow.push(createNode(col, row));
    //       }
    //       grid.push(currentRow);
    //     }
    //     return grid;
    //   }

      const createNode = (col, row) => {
        return {
          col,
          row,
          isStart: row === startRow && col === startCol,
          isFinish: row === finishRow && col === finishCol,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        };
      }
    

    
      useEffect(() => {
        const grid = [];
        for (let row = 0; row < 10; row++) {
          const currentRow = [];
          for (let col = 0; col < 10; col++) {
            currentRow.push(createNode(col, row));
          }
          grid.push(currentRow);
        }
        setGrid(grid);
        // console.log(grid);
      }, []);

      const animateDijkstra = (visitedNodesInOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          setTimeout(() => {
             const newGrid = grid.slice();
          const newnode = {
            ...visitedNodesInOrder[i],
            isVisited: true,
          }
          newGrid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col] = newnode;
            setGrid(newGrid);
          }, 1000 * i);
        }
      }

    const visualizeDijsktra = () => {
        const startNode = grid[startRow][startCol];
        const finishNode = grid[finishRow][finishCol];
                let originalgrid = []
        for (const row of grid) {
          let currentRow = []
          for (const node of row) {
            currentRow.push(Object.assign({}, node));
          }
          originalgrid.push(currentRow);
        }
         const originalStartNode = originalgrid[startRow][startCol];
         const originalFinishNode = originalgrid[finishRow][finishCol];

        const visitedNodesInOrder = dijkstra(originalgrid, originalStartNode, originalFinishNode);
        console.log(visitedNodesInOrder);
        animateDijkstra(visitedNodesInOrder)
      }



    return (
      <div>
        <button onClick={() => visualizeDijsktra()}>Visualize Dijsktra</button>
        <div className="grid">
            {
                grid.map((row, rowIdx) => {
                  
                  return(
                    <div key={rowIdx}>
                    {row.map((box, boxIdx) => {
                      const {isFinish, isStart, isVisited} = box;
                      const color = isFinish ? "red" : isStart ? "green" : isVisited ? "blue" : "";
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
        </div>
    );
}

export default PathfindingVisualizer;