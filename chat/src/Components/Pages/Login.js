import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userData);
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="top-logo">
          <h1>Login</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button>Login User</button>
        <p>
          Do not have an account ?{" "}
          <Link to="/register">
            <span>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
