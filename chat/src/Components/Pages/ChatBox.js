import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalcontext } from "../../App";
import avatar from "../assets/no-user-no-back.png";
import roboGif from "../assets/robot.gif";
import Picker from "emoji-picker-react";
import "./styles.scss";
const ChatBox = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(globalcontext);
  const { currentChat, currentuser } = props;
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [val, setval] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      if (response.ok) {
        setisLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowHideEmojiPeaker = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const handleEmoji = (emoji, event) => {
    setval(val + emoji.emoji);
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    const from = currentuser[0]._id;
    const to = currentChat._id;
    const msg = val;
    try {
    } catch (error) {
      console.log(error.message);
    }

    setval("");
  };
  return (
    <div className="chat-box">
      <div className="chat-head">
        <div className="user-details">
          <img
            src={
              currentChat?.avatarImage
                ? `data:image/svg+xml;base64,${currentChat.avatarImage}`
                : avatar
            }
            alt="avatar"
          />
          <h2>{currentChat?.username ? currentChat.username : "No User"}</h2>
        </div>
        <button onClick={handleLogout}>
          <i className="fa-solid fa-right-to-bracket fa-rotate-180"></i>
        </button>
      </div>
      <div className="conversation-box">
        {!currentChat && (
          <div className="welcome">
            <img src={roboGif} alt="" />
            <h1>
              Welcome <span>Admin !</span>
            </h1>
            <p>Select any contact to start chatting !</p>
          </div>
        )}
      </div>
      {currentChat && showEmojiPicker && (
        <div className="emojiPicker">
          <Picker height={320} width={260} onEmojiClick={handleEmoji} />
        </div>
      )}
      <div className="controls">
        <button onClick={handleShowHideEmojiPeaker}>
          <i className="fa-solid fa-icons"></i>
        </button>
        <form onSubmit={handleSendChat}>
          <input
            type="text"
            placeholder="Message"
            value={val}
            onChange={(e) => setval(e.target.value)}
          />
          <button>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
