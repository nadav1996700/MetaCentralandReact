import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function LandData() {
  const navigate = useNavigate();
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

  const backToMain = () => {
    navigate(-1, { state: { user: user } });
  };

  // make transfer of land between two buyers (of type "User")
  function buyLand() {
    if (user.budget < land.price) {
      setResultMessage("you dont have enough money!");
      return;
    }
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

  // change the status of land from "For Sale" to "Not for sale" and vice versa
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
      if (response.status === 200) {
        setLand({ ...land, can_be_sale: !land.can_be_sale });
      } else {
        setResultMessage("Unable to complete operation");
      }
    });
  }

  // change the price of a land
  function changePrice() {
    const newPrice = document.getElementById("inputPrice").value;
    if (newPrice < 0 || !newPrice) {
      setResultMessage("price must be greater that zero!");
      return;
    }
    setResultMessage("");
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

  // set new game address to a land
  function changeGame() {
    const gameAddress = document.getElementById("gameAddress").value;
    if (!gameAddress) {
      return;
    }
    const promise = axios({
      method: "put",
      url: "http://localhost:3001/land/setGame",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        id: land.id,
        gameAddress: gameAddress,
      },
    });

    promise.then((response) => {
      if (response.status === 200) {
        setLand({ ...land, game: gameAddress });
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
        {land.game && <iframe src={land.game} title="Game"></iframe>}
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
              placeholder="price"
              style={{
                width: "100px",
                borderRadius: "9px",
                display: "inline-block",
                marginLeft: "35px",
              }}
              type="number"
            />
            <h2 style={{ display: "inline-block", marginLeft: "10px" }}>$</h2>
          </div>
          <div className="inputWithDollarSign">
            <button
              className="btnData"
              style={{ display: "inline-block" }}
              onClick={changeGame}
            >
              Set game address
            </button>
            <input
              id="gameAddress"
              placeholder="enter game address"
              style={{
                width: "200px",
                borderRadius: "9px",
                display: "inline-block",
              }}
              type="text"
            />
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
