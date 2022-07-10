import React from "react";
import { useParams } from "react-router-dom";

function LandData() {
  // Get the landId param from the URL.
  let { landId } = useParams();
  return (
    <div className="landDataPage">
      <b>LandData = {landId} </b>
    </div>
  );
}

export default LandData;
