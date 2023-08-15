import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import Loader from "./Loader";

const Avatar = () => {
  const navigate = useNavigate();
  const api_address = "https://api.multiavatar.com/";
  const [avatars, setavatars] = useState([]);
  const [selectedAvatarIndex, setselectedAvatarIndex] = useState(null);
  const [isSelectedAvatar, setisSelectedAvatar] = useState(false);

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
  const handleSetProfile = async () => {
    handleError();
    if (isSelectedAvatar) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/avatar`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: avatars[selectedAvatarIndex] }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  let errorDiv = document.querySelector(".avatar-error");
  const handleError = () => {
    if (!isSelectedAvatar) {
      errorDiv.textContent = "Please selected an avatar!";
      errorDiv.classList.add("show");
    } else {
      errorDiv.classList.replace("avatar-error", "avatar-success");
      errorDiv.textContent = "Avatar select successfully!";
      errorDiv.classList.add("show");
    }
    setTimeout(() => {
      errorDiv.classList.remove("show");
      if (isSelectedAvatar) {
        errorDiv.classList.replace("avatar-success", "avatar-error");
      }
      setisSelectedAvatar(false);
    }, 2000);
  };
  const handleSelected = (index) => {
    setselectedAvatarIndex(index);
    setisSelectedAvatar(true);
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
                    className="avatar-image"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => handleSelected(index)}
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
