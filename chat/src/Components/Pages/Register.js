import React, { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        ["confirmPassword"]: "Confirm password not matches",
      });
      return false;
    } else if (username.length < 3) {
      setErrors({
        ...errors,
        ["username"]: "username must be min 3 letters",
      });
      return false;
    } else if (email == "") {
      setErrors({
        ...errors,
        ["email"]: "enter a valid email",
      });
      return false;
    } else if (password.length < 6) {
      setErrors({
        ...errors,
        ["password"]: "password must be min 6 letters",
      });
      return false;
    } else {
      setErrors({
        ...errors,
        ["username"]: "",
        ["email"]: "",
        ["password"]: "",
        ["confirmPassword"]: "",
      });
      return true;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = userData;
    if (handleValidation()) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/users/register`,
          {
            username,
            email,
            password,
            confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data) {
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="register" onSubmit={handleRegister}>
      <form>
        <div className="top-logo">
          <h1>Register</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <span>{errors.username}</span>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <span>{errors.email}</span>
        <input
          type="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <span>{errors.password}</span>
        <input
          type="Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <span>{errors.confirmPassword}</span>
        <button>Create User</button>
        <p>
          Already have an account ?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
