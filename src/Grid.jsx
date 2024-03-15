import React from 'react';
import { useGameContext } from './GameProvider';
import Cell from './Cell';
import "./Grid.css";

function Grid() {
    const { cols, rows, grid, flipCell, ages, heatMapMode } = useGameContext();

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            alive={cell}
                            flipCell={flipCell}
                            age={ages[rowIndex][colIndex]}
                            heatMap={heatMapMode}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
