import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import Loader from "./Loader";

const Avatar = () => {
  const navigate = useNavigate();
  const api_address = "https://api.multiavatar.com/";
  const [avatars, setavatars] = useState([]);

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

  const handleSelectImage = () => {};

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="avatar-page">
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
                    onClick={handleSelectImage}
                  />
                </li>
              ))}
          </ul>
          <button>Set Avatar</button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Avatar;
