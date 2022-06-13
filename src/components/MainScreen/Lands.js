import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Land from "./Land";

function Lands() {
  const [lands, setLands] = useState([]);

  {
    /*
useEffect(() => {
    axios.get("").then((res) => {
      const data = res.data;
      setLands(data);
    });
  }, []); 


  const landsSquers = lands.map((landData) => <Land data={landData} />);
  return <div className="lands-container"> {landsSquers} </div>;
  */
  }
  return <div>Lands</div>;
}

export default Lands;
