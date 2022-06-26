import React from "react";
import "./MainScreen.css";
import Legend from "./Legend";
import Lands from "./Lands";
import Header from "./Header";

const Main = () => {
  return (
    <div className="main-page">
      <Header />
      <Legend />
      <Lands />
    </div>
  );
};

export default Main;
