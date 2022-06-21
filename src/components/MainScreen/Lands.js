import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Land from "./Land";

function Lands() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/land/getAllLands").then((res) => {
      setLands(res.data);
    });
  }, []);

  return (
    <div className="lands-container">
      {lands.map((landData) => (
        <Land data={landData} />
      ))}
    </div>
  );
}

export default Lands;
