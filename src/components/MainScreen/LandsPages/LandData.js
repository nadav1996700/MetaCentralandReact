import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function LandData() {
  const location = useLocation();
  // eslint-disable-next-line
  const [user, setUser] = useState(location.state.user);
  // eslint-disable-next-line
  const [land, setLand] = useState(location.state.land);

  const [showUserTypeComponent, setShowUserTypeComponent] = useState(false);
  const [showOwnerComponent, setShowOwnerComponent] = useState(false);
  const [showBuyerComponent, setShowBuyerComponent] = useState(false);
  const [buyerMessage, setBuyerMessage] = useState("");

  useEffect(() => {
    if (user.type === "User") {
      setShowUserTypeComponent(true);
      if (land.ownerEmail === user.email) {
        setShowOwnerComponent(true);
      } else if (land.can_be_sale) {
        setShowBuyerComponent(true);
      }
    }
  }, []);

  function buyLand() {
    const promise = axios({
      method: "post",
      url: "http://localhost:3001/land/transferOwnership",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        buyerEmail: user.email,
        sellerEmail: land.ownerEmail,
        buyerName: user.name,
        landId: land.id,
        landPrice: land.price,
      },
    });

    promise.then((response) => {
      if (response.data) {
        setBuyerMessage("The land bought successfully");
      } else {
        setBuyerMessage("Unable to complete operation");
      }
    });
  }

  return (
    <div className="landDataPage">
      <div className="landDataHeader">
        <h1 className="landDataTitle"> Land Data Page </h1>
        <button className="back_button_landdata">back</button>
      </div>
      <div className="ownerDetailsSection">
        <p className="textStyle">
          Owner: {land.ownerName} <br /> <br /> Email: {land.ownerEmail}
        </p>
      </div>
      <div className="game">
        <iframe
          src="http://www.google.com"
          title="W3Schools Free Online Web Tutorials"
        ></iframe>
      </div>
      {showUserTypeComponent && (
        <div className="userDetailsSection">
          <p className="textStyle">
            Status: {land.can_be_sale ? "For sale" : "Not for sale"} <br />{" "}
            <br /> Price: {land.price}$
          </p>
        </div>
      )}
      {showOwnerComponent && (
        <div className="ownerOptionsSection">
          <h2 style={{ marginTop: "10px" }}>Options:</h2>
          <button className="btnData">Change status</button> <br />
          <div className="inputWithDollarSign">
            <button className="btnData" style={{ display: "inline-block" }}>
              Change price
            </button>
            <input
              style={{
                width: "100px",
                borderRadius: "9px",
                display: "inline-block",
              }}
              type="number"
            />
            <h2 style={{ display: "inline-block", marginLeft: "10px" }}>$</h2>
          </div>
        </div>
      )}
      {showBuyerComponent && (
        <div className="buyerSection">
          <h2 style={{ marginTop: "10px" }}> buy yourself a land</h2>
          <button
            style={{ marginLeft: "130px", marginTop: "40px" }}
            onClick={buyLand}
          >
            buy
          </button>
          <p className="successMessage">{buyerMessage}</p>
        </div>
      )}
    </div>
  );
}

export default LandData;
