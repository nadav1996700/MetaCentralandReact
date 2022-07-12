import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Land from "./Land";

function Lands(props) {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/land/getAllLands").then((res) => {
      setLands(res.data);
    });
  }, []);

  return (
    <div className="lands-container">
      {lands.map((landData, i) => (
        <Land key={i} land={landData} user={props.user} />
      ))}
    </div>
  );
}

export default Lands;
