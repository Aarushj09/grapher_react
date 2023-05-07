import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const resetInputs = () => {
    setUsername("");
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
        window.location="/login";
      })
      .catch((err) => {
        console.log(err);
      });
    resetInputs();
  };
  return (
    <div className="auth">
      <h1>Sign-up</h1>
      <form>
        <input required type="text" placeholder="Username" value={username} onChange={onChangeUsername} />
        <input required type="email" placeholder="Email ID" value={email} onChange={onChangeEmail}/>
        <input required type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
        <button onClick={onSubmit}>Register</button>
        {/* <p> Error! </p> */}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
