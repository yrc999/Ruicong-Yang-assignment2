import React from "react";
import Nav from "./Nav";
import "./Home.css";

function Home() {
    return (
        <div>
            <Nav />
            <div className="container">
                <h1>Conway’s Game of Life</h1>
                <p>
                    Conway’s Game of Life (or just, Life, as I will call it) is a game that is “played” based on a grid system.  
                    Every individual location on the grid can be understood as a cell.  The game, or simulation, occurs over 
                    iterations, or generations.  After a generation, a cell may change from living or dead based on how many living 
                    or dead neighbors it had in a previous iteration.  A neighbor is any immediately adjacent spot on the grid 
                    (horizontal, vertical or diagonal). 
                </p>
                <ol>
                    Life has 4 simple rules:
                    <li>A living cell with less than two living neighbours dies.</li>
                    <li>A living cell with two or three live neighbours lives.</li>
                    <li>A living cell with more than three live neighbours dies.</li>
                    <li>A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ol>
            </div>
        </div>
    );
}

export default Home;