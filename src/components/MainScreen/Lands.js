import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Land from "./Land";
import { useNavigate } from "react-router-dom";

function Lands(props) {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/land/getAllLands").then((res) => {
      setLands(res.data);
    });
  }, []);

  return (
    <div className="lands-container">
      {lands.map((landData, i) => (
        <Land
          key={i}
          data={landData}
          user={props.user}
          onClick={() =>
            navigate("/main", {
              landId: landData.id,
            })
          }
        />
      ))}
    </div>
  );
}

export default Lands;
