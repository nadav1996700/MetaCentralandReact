import React from "react";
import "./MainScreen.css";
import Legend from "./Legend";
import Lands from "./Lands";

function Main() {
  return (
    <div className="main-page">
      <header>
        <h1> META CENTRALAND GAME </h1>
        <button className="logout"> Log Out</button>
      </header>
      <Legend />
      <Lands />
    </div>
  );
}

export default Main;
