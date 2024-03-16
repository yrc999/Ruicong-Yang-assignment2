import React, { useMemo } from "react";
import { useGameContext } from "./GameProvider";
import Cell from "./Cell";
import "./Grid.css";

function Grid() {
    const { cols, rows, grid, flipCell, ages, heatMapMode } = useGameContext();

    const cellSize = useMemo(() => {
        const totalWidth = 100;
        const totalHeight = 100;
        const cellWidth = totalWidth / cols;
        const cellHeight = totalHeight / rows;
        return {
            width: `${cellWidth}%`,
            height: `${cellHeight}%`
        };
    }, [cols, rows]);

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize.width})`, gridTemplateRows: `repeat(${rows}, ${cellSize.height})` }}>
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
