import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth">
      <h1>Sign-up</h1>
      <form>
        <input required type="text" placeholder="Username" />
        <input required type="email" placeholder="Email ID" />
        <input required type="password" placeholder="Password" />
        <button>Login</button>
        {/* <p> Error! </p> */}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
