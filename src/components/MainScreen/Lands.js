import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Land from "./Land";

function Lands() {
  const [lands, setLands] = useState([]);
  //const myLands = useRef([]);

  useEffect(() => {
    axios.get("http://localhost:3001/land/getAllLands").then((res) => {
      //myLands.current = res.data;
      setLands(res.data);
    });
  }, []);

  return (
    <div className="lands-container">
      {lands.map((landData, i) => (
        <Land key={i} data={landData} />
      ))}
    </div>
  );
}

export default Lands;
