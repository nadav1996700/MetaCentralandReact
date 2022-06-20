import React from "react";
import { useState } from "react";
import "./Auth.css";
const axios = require("axios");

function Auth() {
  const [toggleClass, setToggleClass] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    login_email: "",
    login_password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    register_email: "",
    register_password: "",
    type: "",
  });

  const container_class_handler = () => {
    setToggleClass(!toggleClass);
  };

  const handleLogin = (event) => {
    // Prevent page reload
    event.preventDefault();

    // check if user exist
    const promise = axios({
      method: "post",
      url: "http://localhost:3001/user/login/",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        email: loginFormData.login_email,
        password: loginFormData.login_password,
      },
    });
    promise.then((response) => {
      if (response.data === "success") {
        console.log("login ok");
      } else if (response.data === "failure") {
        console.log("login failed");
      }
    });
  };

  const handleRegister = (event) => {};

  return (
    <div>
      <h2 style={{ color: "#ffff" }}>META CENTRALAND Game</h2>
      <div
        className={`container ${toggleClass ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  name: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  register_email: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  register_password: e.target.value,
                })
              }
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  login_email: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  login_password: e.target.value,
                })
              }
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={container_class_handler}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={container_class_handler}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
