import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

function Login() {
       const [ username, setUsername ] = useState();
       const [ password, setPassword ] = useState();
       let history = useNavigate();
       const onLogin = () =>{
              const loginData = {
                     username: username,
                     password: password
              }
              axios.post("http://localhost:3001/users/login", loginData).then(response =>{
                     localStorage.setItem("username", username);
                     history("/dashboard");
              })
       }
       return (
              <div className='login-container'>
                     <div className='login'>
                            <label>Username:</label>
                            <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                            <label>Password:</label>
                            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                            <button onClick={()=>{
                                   onLogin();
                            }}>Login</button>
                            <h1>Not a user yet? <Link to="/signup" className='signup-link'>Sign up</Link></h1>
                     </div>
              </div>
       )
}

export default Login
