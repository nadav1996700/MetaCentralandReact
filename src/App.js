import React from "react";
import Auth from "./components/Auth/Auth";
import Main from "./components/MainScreen/Main";
import Footer from "./components/MainScreen/staticPages/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandData from "./components/MainScreen/LandsPages/LandData";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/main">
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/main/landData" element={<LandData />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
