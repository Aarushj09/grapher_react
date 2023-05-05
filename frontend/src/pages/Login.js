import React from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
      setPassword(e.target.value);
    };
    const resetInputs = () => {
      setEmail("");
      setPassword("");
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const user = {
        email:email,
        password:password
      };
      axios
        .post("", user)
        .then((res) => {
          console.log(res.data);
          resetInputs();
        })
        .catch((err) => {
          console.log(err);
        });
    };


    return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='Email' value={email} onChange={onChangeEmail} />
        <input required type="password" placeholder='Password' value={password} onChange={onChangePassword}/> 
        <button onClick={onSubmit}>Login</button>
        <span>Don't you have an account? <Link to="/signup">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;