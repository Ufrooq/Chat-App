import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import Loader from "./Loader";
import Styled from "styled-components";

const Avatar = () => {
  const navigate = useNavigate();
  const api_address = "https://api.multiavatar.com/";
  const [avatars, setavatars] = useState([]);
  const [selectedAvatar, setselectedAvatar] = useState(null);

  async function fetchData() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api_address}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setavatars(data);
  }

  const handleError = () => {
    let errorDiv = document.querySelector(".avatar-error");
    if (!selectedAvatar) {
      errorDiv.textContent = "Please selected an avatar!";
    } else {
      errorDiv.classList.replace("avatar-error", "avatar-success");
      errorDiv = document.querySelector(".avatar-success");
      errorDiv.textContent = "Avatar selected successfully!";
    }
    errorDiv.classList.add("show");
    setTimeout(() => {
      errorDiv.classList.remove("show");
    }, 2000);
    setselectedAvatar(null);
  };

  const handleSetProfile = () => {
    handleError();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="avatar-page">
      <span className="avatar-error"></span>
      {avatars.length > 0 ? (
        <div className="avatar-container">
          <h1>Pick an avatar for your profile</h1>
          <ul className="avatars">
            {avatars.length > 0 &&
              avatars.map((avatar, index) => (
                <li key={index}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setselectedAvatar(index)}
                  />
                </li>
              ))}
          </ul>
          <button onClick={handleSetProfile}>Set Avatar</button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Avatar;
