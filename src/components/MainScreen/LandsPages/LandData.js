import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    if (user.type === "User") {
      setShowUserTypeComponent(true);
      if (land.ownerEmail === user.email) {
        setShowOwnerComponent(true);
        setShowBuyerComponent(false);
      } else if (land.can_be_sale) {
        setShowBuyerComponent(true);
      }
    }
  }, [land]);

  function backToMain() {
    const navigate = useNavigate();
    navigate("/main", { state: { user: user } });
  }

  function buyLand() {
    const promise = axios({
      method: "put",
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
      if (response.status === 200) {
        setLand({
          ...land,
          ownerName: user.name + ".Ltd",
          ownerEmail: user.email,
          can_be_sale: false,
        });
      } else {
        setResultMessage("Unable to complete operation");
      }
    });
  }

  function changeStatus() {
    const promise = axios({
      method: "put",
      url: "http://localhost:3001/land/isForSale",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        id: land.id,
        can_be_sale: !land.can_be_sale,
      },
    });

    promise.then((response) => {
      console.log("response: " + JSON.stringify(response));
      if (response.status === 200) {
        setLand({ ...land, can_be_sale: !land.can_be_sale });
      } else {
        setResultMessage("Unable to complete operation");
      }
    });
  }

  function changePrice() {
    const newPrice = document.getElementById("inputPrice").value;
    const promise = axios({
      method: "put",
      url: "http://localhost:3001/land/setPrice",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        id: land.id,
        newPrice: newPrice,
      },
    });

    promise.then((response) => {
      if (response.status === 200) {
        setLand({ ...land, price: newPrice });
      } else {
        setResultMessage("Unable to complete operation");
      }
    });
  }

  return (
    <div className="landDataPage">
      <div className="landDataHeader">
        <h1 className="landDataTitle"> Land Data Page </h1>
        <button className="back_button_landdata" onClick={backToMain}>
          back
        </button>
      </div>
      <div className="ownerDetailsSection">
        <p className="textStyle">
          Owner: {land.ownerName} <br /> <br /> Email: {land.ownerEmail}
        </p>
      </div>
      <div className="game">
        <iframe
          src="https://www.youtube.com/embed?v=06-XXOTP3Gc&list=RD06-XXOTP3Gc&start_radio=1"
          title="W3Schools Free Online Web Tutorials"
          allowFullScreen
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
          <button className="btnData" onClick={changeStatus}>
            Change status
          </button>{" "}
          <br />
          <div className="inputWithDollarSign">
            <button
              className="btnData"
              style={{ display: "inline-block" }}
              onClick={changePrice}
            >
              Change price
            </button>
            <input
              id="inputPrice"
              style={{
                width: "100px",
                borderRadius: "9px",
                display: "inline-block",
              }}
              type="number"
            />
            <h2 style={{ display: "inline-block", marginLeft: "10px" }}>$</h2>
            <p className="successMessage">{resultMessage}</p>
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
          <p className="successMessage">{resultMessage}</p>
        </div>
      )}
    </div>
  );
}

export default LandData;
