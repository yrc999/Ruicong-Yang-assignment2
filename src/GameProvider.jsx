import React, { useState, createContext, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

function GameProvider({ children }) {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(20);
    const [grid, setGrid] = useState(() => createEmptyGrid(rows, cols));
    const [livingCells, setLivingCells] = useState(0);
    const [heatMapMode, setHeatMapMode] = useState(false);
    const [ages, setAges] = useState(() => createAges(rows, cols));
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        let interval;
        if (autoplay) {
            interval = setInterval(progressSimulation, 500);
        }
        return () => clearInterval(interval);
    }, [autoplay, progressSimulation]);

    function toggleAutoplay() {
        setAutoplay(!autoplay);
    }

    function createEmptyGrid(rows, cols) {
        const grid = [];
        const totalCells = rows * cols;
        const numAliveCells = Math.floor(totalCells * 0.05);
        const clusterCount = Math.ceil(numAliveCells / 5);
        const clusterRadius = 3;
        const clusterAliveProbability = 0.5;

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(false);
            }
            grid.push(row);
        }
    
        for (let cluster = 0; cluster < clusterCount; cluster++) {
            const clusterRow = Math.floor(Math.random() * rows);
            const clusterCol = Math.floor(Math.random() * cols);

            for (let i = -clusterRadius; i <= clusterRadius; i++) {
                for (let j = -clusterRadius; j <= clusterRadius; j++) {
                    const newRow = clusterRow + i;
                    const newCol = clusterCol + j;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        if (Math.random() < clusterAliveProbability) {
                            grid[newRow][newCol] = true;
                        }
                    }
                }
            }
        }
    
        return grid;
    }
    

    function createAges(rows, cols) {
        const ages = [];
        for (let i = 0; i < rows; i++) {
            const rowAges = [];
            for (let j = 0; j < cols; j++) {
                if (grid[i][j]) {
                    rowAges.push(1);
                } else {
                    rowAges.push(10);
                }
            }
            ages.push(rowAges);
        }
        return ages;
    }

    function flipCell(row, col) {
        const newGrid = [...grid];
        const newAges = [...ages];
        newGrid[row][col] = !newGrid[row][col];
        if (newGrid[row][col]) {
            newAges[row][col] = 1;
        } else {
            newAges[row][col] = 10;
        }
        setGrid(newGrid);
        setAges(newAges);
    }

    function handleSizeChange(newRows, newCols) {
        if (newRows < 3 || newRows > 40 || newCols < 3 || newCols > 40) {
            console.log("Invalid range. Please enter values between 3 and 40.");
            return;
        }
        setRows(newRows);
        setCols(newCols);
        setGrid(createEmptyGrid(newRows, newCols));
    }

    function resetGrid() {
        setGrid(createEmptyGrid(20, 20));
        setAges(createAges(20, 20));
    }

    function toggleHeatMap() {
        setHeatMapMode(!heatMapMode);
    }

    function progressSimulation() {
        const newGrid = [];
        const newAges = [];
        for (let i = 0; i < rows; i++) {
            const newRow = [];
            const newAgeRow = [];
            for (let j = 0; j < cols; j++) {
                const neighbors = countLivingNeighbors(i, j);
                const currentCell = grid[i][j];
                const currentAge = ages[i][j];
                let newCell = currentCell;
                let newAge = currentAge;
    
                if (currentCell) {
                    if (neighbors < 2) {
                        newCell = false;
                        newAge += 1;
                    }
                    else if (neighbors === 2 || neighbors === 3) {
                        newCell = true;
                        newAge = 1;
                    }
                    else {
                        newCell = false;
                        newAge += 1;
                    }
                } else {
                    if (neighbors === 3) {
                        newCell = true;
                        newAge = 1;
                    } else {
                        newAge += 1;
                    }
                }
    
                newRow.push(newCell);
                newAgeRow.push(newAge);
            }
            newGrid.push(newRow);
            newAges.push(newAgeRow);
        }
        setGrid(newGrid);
        setAges(newAges);
    }

    function countLivingNeighbors(row, col) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === row && j === col)) {
                    if (grid[i][j]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    useEffect(() => {
        let count = 0;
        grid.forEach(row => {
            row.forEach(cell => {
                if (cell) count++;
            });
        });
        setLivingCells(count);
    }, [grid]);

    return (
        <GameContext.Provider value={{ rows, cols, grid, flipCell, handleSizeChange, livingCells, resetGrid, progressSimulation, ages, heatMapMode, toggleHeatMap, autoplay, toggleAutoplay }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;
