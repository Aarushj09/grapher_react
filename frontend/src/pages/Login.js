import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import { Link } from 'react-router-dom'
import "../styles/pages/Auth.css";

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
      email: email,
      password: password
    };

    axios
      .post("https://grapher-dfs.onrender.com/auth/login", user)
      .then((res) => {
        resetInputs();
        // Set token to cookie with same site
        document.cookie = `token=${res.data.token}; path=/; SameSite=Strict`;

        Swal.fire({
          title: 'Success!',
          text: "Login successful!",
          icon: 'success',
          confirmButtonText: 'OK'
        })
          .then(() => {
            // Redirect to datasets page
            window.location = "/datasets";
          });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops...',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  };


  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='Email' value={email} onChange={onChangeEmail} />
        <input required type="password" placeholder='Password' value={password} onChange={onChangePassword} />
        <button onClick={onSubmit}>Login</button>
        <span>Don't you have an account? <Link to="/signup">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;