import React, { useState } from "react";
import { useEffect } from "react";
import { dijkstra } from "../algorithms/Dijkstra";
import "../styles/PathfindingVisualizer.css";
import Box from "./Box";
import { Button } from "@mui/material";

function PathfindingVisualizer() {

    const startCol = 1;
    const startRow = 2;
    const finishCol = 5;
    const finishRow = 2;

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

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
          onShortestPath: false,

        };
      }
    

    
      useEffect(() => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
          const currentRow = [];
          for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
          }
          grid.push(currentRow);
        }
        setGrid(grid);
        // console.log(grid);
      }, []);

      
      const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const newGrid = grid.slice();
            const newNode = {
              ...node,
              onShortestPath: true,
            }
            newGrid[node.row][node.col] = newNode;
            setGrid(newGrid);
          }, 50* i);
        }
      }

      const  animateDijkstra = (visitedNodesInOrder, shortestPath) => {
        for (let i = 0; i <=visitedNodesInOrder.length; i++) {
          
          setTimeout(() => {
            if (i === visitedNodesInOrder.length) {
              animateShortestPath(shortestPath);
              return;
            }
            // console.log("visited nodes");
             const newGrid = grid.slice();
          const newnode = {
            ...visitedNodesInOrder[i],
            isVisited: true,
          }
          console.log(newnode);
          newGrid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col] = newnode;
            setGrid(newGrid);
          }, 100 * i);
        }

        



      }

      const getNodesInShortestPathOrder = (finishNode) => {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
          nodesInShortestPathOrder.unshift(currentNode);
          currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
      }

    const visualizeDijsktra = () => {
        let originalgrid = []
        for (const row of grid) {
          let currentRow = []
          for (const node of row) {
            currentRow.push(Object.assign({}, node));
          }
          originalgrid.push(currentRow);
        }
         const startNode = originalgrid[startRow][startCol];
         const finishNode = originalgrid[finishRow][finishCol];

        const visitedNodesInOrder = dijkstra(originalgrid, startNode, finishNode);
        const shortestPath = getNodesInShortestPathOrder(finishNode);
        // console.log(finishNode);
        // console.log(visitedNodesInOrder);
        console.log(shortestPath);
        animateDijkstra(visitedNodesInOrder, shortestPath);
        // animateShortestPath(shortestPath);
      }

      const handleMouseDown = (row, col) => {
        // console.log(row, col);
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
        // console.log(grid[row][col]);
      };

      const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
      };

      const handleMouseUp = () => {
        setMouseIsPressed(false);
      };

      const getNewGridWithWallToggled = (grid, row, col) => {
        // console.log(row, col, grid);
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
      };



    return (
      <div>
        <Button onClick={() => visualizeDijsktra()}>Visualize Dijsktra</Button>
        <div className="grid">
            {
                grid.map((row, rowIdx) => {
                  
                  return(
                    <div key={rowIdx}>
                    {row.map((box, boxIdx) => {
                      const {isFinish, isStart, isVisited, onShortestPath, isWall} = box;
                      const color = onShortestPath ? "yellow"  : isFinish ?  "red" : isStart ? "green" : isVisited ? "mediumslateblue" : isWall ? "black" : "";
                      return(
                    <Box
                      key={boxIdx}
                      color={color}
                      isStart={isStart}
                      isFinish={isFinish}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                      row={rowIdx}
                      col={boxIdx}


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