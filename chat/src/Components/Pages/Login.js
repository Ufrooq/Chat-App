import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = userData;
    if (username.length < 1) {
      setErrors({
        ...errors,
        ["username"]: "username is required !",
      });
      return false;
    } else if (password.length < 1) {
      setErrors({
        ...errors,
        ["password"]: "password is required !",
      });
      return false;
    } else {
      setErrors({
        ...errors,
        ["username"]: "",
        ["password"]: "",
      });
      return true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = userData;
    if (handleValidation()) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/users/login`,
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            withCredentials: true,
          }
        );
        if (data) {
          navigate("/");
        }
      } catch (error) {
        const errorMessage = error.response.data.error;
        setErrors({
          ...errors,
          ["username"]: errorMessage.endsWith("username!") ? errorMessage : "",
          ["password"]: errorMessage.endsWith("password!") ? errorMessage : "",
        });
        console.log(errors.username);
      }
    }
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
        <span>{errors.username}</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <span>{errors.password}</span>
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
