import React from "react";
import Auth from "./components/Auth/Auth";
import Main from "./components/MainScreen/Main";
import Footer from "./components/MainScreen/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
