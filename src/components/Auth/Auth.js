import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthDesign.css";
import axios from "axios";

function Auth() {
  const navigate = useNavigate();
  const [toggleClass, setToggleClass] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    login_email: "",
    login_password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    register_email: "",
    register_password: "",
    type: "User",
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
    promise
      .then((response) => {
        console.log("got here");
        if (response.status === 200) {
          console.log("login ok");
          navigate("/main", { state: { user: response.data } });
        }
      })
      .catch((err) => {
        console.log("login error: " + err);
        setLoginErrorMessage("login failed");
      });
  };

  const handleRegister = (event) => {
    // Prevent page reload
    event.preventDefault();

    const promise = axios({
      method: "post",
      url: "http://localhost:3001/user/signup/",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: registerFormData.name,
        email: registerFormData.register_email,
        password: registerFormData.register_password,
        type: registerFormData.type,
        budget: registerFormData.type === "User" ? 1000 : 0,
      },
    });

    promise
      .then((response) => {
        if (response.status === 200) {
          console.log("register ok");
          container_class_handler();
        }
      })
      .catch((err) => {
        console.log("error: " + err);
        setRegisterErrorMessage("user with this email already exist");
      });
  };

  // function for radio buttons that set the type of user
  function onChangeValue(event) {
    setRegisterFormData({
      ...registerFormData,
      type: event.target.value,
    });
  }

  return (
    <div className="authBody">
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
              required
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
              required
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
              required
            />
            <div className="radio-group" onChange={onChangeValue}>
              <label>
                <input
                  type="radio"
                  placeholder="user"
                  name="typeOfUser"
                  value="User"
                  defaultChecked={registerFormData.type === "User"}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  placeholder="guest"
                  name="typeOfUser"
                  value="Guest"
                  defaultChecked={registerFormData.type === "Guest"}
                />
                Guest
              </label>
            </div>
            <button type="submit" id="signupSubmit">
              Sign Up
            </button>
            <p className="error"> {registerErrorMessage}</p>
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
            <button type="submit" id="signInSubmit">
              Sign In
            </button>
            <p className="error"> {loginErrorMessage}</p>
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
