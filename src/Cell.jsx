import React from 'react';
import './Cell.css';

function Cell({ row, col, alive, flipCell, age, heatMap }) {
    const handleClick = () => {
        flipCell(row, col);
    };

    const calculateCellColor = (age) => {
        const aliveColor = [255, 0, 0];
        const deadColor = [0, 255, 0];

        const maxAge = 10;
        const percentage = Math.min(age / maxAge, 1);
        const r = Math.round(aliveColor[0] * percentage + deadColor[0] * (1 - percentage));
        const g = Math.round(aliveColor[1] * percentage + deadColor[1] * (1 - percentage));
        const b = Math.round(aliveColor[2] * percentage + deadColor[2] * (1 - percentage));
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    if (heatMap) {
        return (
            <div
                className="cell"
                onClick={handleClick}
                style={{ backgroundColor: calculateCellColor(age) }}
            ></div>
        );
    }

    return (
        <div
            className={`cell ${alive ? "alive" : "dead"}`}
            onClick={handleClick}
        ></div>
    );
}

export default Cell;
