import React from "react";
import "./MainScreen.css";

function Legend() {
  return (
    <ul>
      <li>
        <div className="colored-box" style={{ backgroundColor: "#A6A6AC" }} />
        <h3>Road</h3>
      </li>
      <li>
        <div className="colored-box" style={{ backgroundColor: "#5BE539" }} />
        <h3>Park</h3>
      </li>
      <li>
        <div className="colored-box" style={{ backgroundColor: "#7896D5" }} />
        <h3>For Sale</h3>
      </li>
      <li>
        <div className="colored-box" style={{ backgroundColor: "#0439A9" }} />
        <h3>Not For Sale</h3>
      </li>
      <li>
        <div className="colored-box" style={{ backgroundColor: "#EC1512" }} />
        <h3>My Lands</h3>
      </li>
    </ul>
  );
}

export default Legend;
