import React from "react";
import GameProvider from "./GameProvider";
import Game from "./Game";

function GameWrapper() {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
}

export default GameWrapper;
