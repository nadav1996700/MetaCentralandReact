import React from "react";
import { useNavigate } from "react-router-dom";
// <br /> hello {name}!

function Header(props) {
  const navigate = useNavigate();
  const LogOut = () => {
    navigate("/");
  };

  console.log("name = " + props.name);
  return (
    <div>
      <header>
        <h1 className="title">META CENTRALAND GAME {props.name}</h1>
        <button className="logout" onClick={LogOut}>
          Log Out
        </button>
      </header>
    </div>
  );
}

export default Header;
