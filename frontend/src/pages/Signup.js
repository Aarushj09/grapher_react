import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Auth.css";

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

    // Check if email is valid
    if (!email.includes("@")) {
      Swal.fire({
        title: 'Oops...',
        text: "Please enter a valid email ID!",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const user = {
      username: username,
      email: email,
      password: password
    };

    axios
      .post("https://grapher-dfs.onrender.com/auth/signup", user)
      .then((res) => {
        resetInputs();
        // Set auth token to cookie on the client side
        document.cookie = `token=${res.data.token}; path=/; SameSite=Strict`;

        Swal.fire({
          title: 'Success!',
          text: "Signup successful!",
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

    resetInputs();
  };

  return (
    <div className="auth">
      <h1>Sign-up</h1>
      <form>
        <input required type="text" placeholder="Username" value={username} onChange={onChangeUsername} />
        <input required type="email" placeholder="Email ID" value={email} onChange={onChangeEmail} />
        <input required type="password" placeholder="Password" value={password} onChange={onChangePassword} />
        <button onClick={onSubmit}>Register</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
