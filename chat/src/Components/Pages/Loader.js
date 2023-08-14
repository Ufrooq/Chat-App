import React from "react";
import loader from "../assets/duck.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
      <h2>loading.....</h2>
    </div>
  );
};

export default Loader;
