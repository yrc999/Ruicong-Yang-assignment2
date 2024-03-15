import React from "react";
import Nav from "./Nav";
import "./Credit.css";

function Credit() {
    return (
        <div>
            <Nav />
            <div className="container">
                <h1>Credits:</h1>
                <div>
                    <p><span>Developer:</span> Ruicong Yang</p>
                    <p><span>Contact:</span> masyrc530@gmail.com</p>
                    <p><span>Website:</span> <a href="https://github.com/yrc999/Ruicong-Yang-assignment2">https://github.com/yrc999/Ruicong-Yang-assignment2</a></p>
                </div>
            </div>
        </div>
    );
}

export default Credit;