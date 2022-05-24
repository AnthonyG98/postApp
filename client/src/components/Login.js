import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let history = useNavigate();
  const onLogin = () => {
    const loginData = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:3001/users/login", loginData)
      .then((response) => {
        localStorage.setItem("username", username);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          history("/messages");
        }
      });
  };
  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-head">
          W<p className="welcome">elcome!</p>
        </h1>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"Username"}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
        />
        <button
          onClick={() => {
            onLogin();
          }}
        >
          Login
        </button>
        <h1>
          Not a user yet?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Login;
