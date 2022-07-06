import React, { useState } from "react";
import "./MainScreen.css";
import Legend from "./Legend";
import Lands from "./Lands";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const Main = (props) => {
  const location = useLocation();
  // eslint-disable-next-line
  const [user, setUser] = useState(location.state.user);
  console.log("user from main: " + JSON.stringify(location.state.user));
  return (
    <div className="main-page">
      <Header name={user.name} />
      <Legend />
      <Lands user={user} />
    </div>
  );
};

export default Main;
