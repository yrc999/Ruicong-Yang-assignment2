import React, { useState } from "react";
import { useGameContext } from "./GameProvider";
import Grid from "./Grid";
import Nav from "./Nav";

function Game() {
    const { rows, cols, flipCell, handleSizeChange, resetGrid, progressSimulation, livingCells, toggleHeatMap, autoplay, toggleAutoplay } = useGameContext();
    const [newRows, setNewRows] = useState(rows);
    const [newCols, setNewCols] = useState(cols);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = () => {
        if (newRows < 3 || newRows > 40 || newCols < 3 || newCols > 40) {
            setErrorMessage("Invalid range. Please enter values between 3 and 40.");
        } else {
            handleSizeChange(newRows, newCols);
            setErrorMessage("");
        }
    };

    return (
        <div className="container">
            <Nav />
            <h1>Conway's Game of Life</h1>
            <div>
                <div className="input-container">
                    <input
                        type="number"
                        value={newRows}
                        onChange={(e) => setNewRows(parseInt(e.target.value))}
                        placeholder="Enter height (3-40)"
                    />
                    <input
                        type="number"
                        value={newCols}
                        onChange={(e) => setNewCols(parseInt(e.target.value))}
                        placeholder="Enter width (3-40)"
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <Grid />
                <div className="button-container">
                    <button onClick={resetGrid}>Reset Grid</button>
                    <button onClick={progressSimulation}>Progress Simulation</button>
                    <button onClick={toggleHeatMap}>HeatMap</button>
                    <button onClick={toggleAutoplay}>{autoplay ? 'Stop Autoplay' : 'Start Autoplay'}</button>
                </div>
            </div>
            <div className="living-cells">Number of living cells: {livingCells}</div>
        </div>
    );
}

export default Game;
