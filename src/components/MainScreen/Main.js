import React, { useState } from "react";
import "./MainScreen.css";
import Legend from "../MainScreen/staticPages/Legend";
import Lands from "../MainScreen/LandsPages/Lands";
import Header from "../MainScreen/staticPages/Header";
import { useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  // eslint-disable-next-line
  const [user, setUser] = useState(location.state.user);
  return (
    <div className="main-page">
      <Header name={user.name} />
      <Legend />
      <Lands user={user} />
    </div>
  );
};

export default Main;
