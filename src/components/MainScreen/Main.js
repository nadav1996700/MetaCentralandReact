import React from "react";
import "./Main.css";

function Main() {
  return (
    <div className="main-page">
      <header>
        <h1> META CENTRALAND GAME </h1>
        <button className="logout"> Log Out</button>
      </header>
      <legend>
        <ul>
          <li>
            <div
              className="colored-box"
              style={{ background_color: "#A6A6AC" }}
            />
            <h3>Road</h3>
          </li>
          <li>
            <div
              className="colored-box"
              style={{ background_color: "#5BE539" }}
            />
            <h3>Park</h3>
          </li>
          <li>
            <div
              className="colored-box"
              style={{ background_color: "#7896D5" }}
            />
            <h3>For Sale</h3>
          </li>
          <li>
            <div
              className="colored-box"
              style={{ background_color: "#0439A9" }}
            />
            <h3>Not For Sale</h3>
          </li>
          <li>
            <div
              className="colored-box"
              style={{ background_color: "#EC1512" }}
            />
            <h3>My Lands</h3>
          </li>
        </ul>
      </legend>
    </div>
  );
}

export default Main;
