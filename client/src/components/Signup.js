import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState();
  let history = useNavigate();
  let localUsername = localStorage.getItem("username");
  const onSignup = () => {
    const signUpData = {
      username: username,
      password: password,
      profile_picture: "default_nlfrji",
      profile_cover: "sample",
    };
    axios.post("http://localhost:3001/users", signUpData).then((response) => {
      localStorage.setItem("username", username);
      // axios.get(`http://localhost:3001/users/${response.data.username}`).then(response =>{
      //        console.log(response);
      // })
      console.log(response);
      history("/messages");
    });
    // const imgFormData = new FormData();
    // imgFormData.append("file", image);
    // imgFormData.append("upload_preset", "fy5ahm9g");
    // axios.post(`https://api.cloudinary.com/v1_1/delktfw1a/image/upload`, imgFormData).then(response =>{
    //        const fileName = response.data.public_id;
    //               const signUpData = {
    //                      username: username,
    //                      password: password,
    //                      profile_picture: fileName
    //               }
    //               axios.post("http://localhost:3001/users", signUpData).then(response =>{
    //                      localStorage.setItem("username", username)
    //                      console.log(response)
    //                      history("/dashboard");
    //               })
    // })
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
            onSignup();
          }}
        >
          Sign up
        </button>
        <h1>
          Already have an account?{" "}
          <Link to="/" className="signup-link">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Signup;
