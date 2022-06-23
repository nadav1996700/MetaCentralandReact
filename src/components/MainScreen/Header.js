import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  useNavigate("/");
};

function Header() {
  return (
    <div>
      <header>
        <h1 className="title"> META CENTRALAND GAME </h1>
        <button className="logout" onClick={LogOut}>
          Log Out
        </button>
      </header>
    </div>
  );
}

export default Header;
