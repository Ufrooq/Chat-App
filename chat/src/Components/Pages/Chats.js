import React, { useContext, useEffect, useRef, useState } from "react";
import avatar from "../assets/no-user-no-back.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ChatBox from "./ChatBox";
import { globalcontext } from "../../App";
import "./styles.scss";

const Chats = ({ socket }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(globalcontext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [currentuser, setcurrentUser] = useState([]);
  const [messagesArray, setmessagesArray] = useState([]);
  const [isUserOnline, setisUserOnline] = useState(false);
  // const socket = io.connect(process.env.REACT_APP_SERVER_URL);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const { userContacts, currentUser } = await response.json();
      if (!response.ok) {
        navigate("/login");
        setisLoggedIn(false);
      } else if (currentUser[0].avatarImage == "") {
        navigate("/avatar");
        setisLoggedIn(false);
      } else {
        setisLoggedIn(true);
        setcurrentUser(currentUser);
        setContacts(userContacts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMessages = async (currentuser, currentChat) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/messages/getmsgs`,
        {
          method: "POST",
          credentials: "include",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: currentuser[0]?._id,
            to: currentChat?._id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setmessagesArray(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    socket.emit("addUser", currentuser[0]?._id);
  }, [currentuser]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      if (currentChat?._id == data.currentReciever) {
        console.log(
          "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
        );
        setmessagesArray([
          ...messagesArray,
          { fromSelf: false, message: data.text },
        ]);
      }
    });
  }, [socket, messagesArray, currentChat]);

  //useEffect for fetching chats and seeting room id-->
  useEffect(() => {
    fetchMessages(currentuser, currentChat);
  }, [currentChat]);

  //general useEffect -->
  useEffect(() => {
    setTimeout(() => {
      fetchContacts();
    }, 2000);
  }, []);

  return (
    <>
      <div className="chat-page">
        {contacts.length > 0 ? (
          <div className="chat-container">
            <div className="chats-panel">
              <h1>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  DuckChats
                </Link>
              </h1>
              <div className="chats">
                {contacts.map((chat, index) => (
                  <div
                    className="chat"
                    key={index}
                    onClick={() => {
                      setcurrentChat(chat);
                    }}
                  >
                    <img
                      src={
                        chat.avatarImage
                          ? `data:image/svg+xml;base64,${chat.avatarImage}`
                          : avatar
                      }
                      alt="avatar"
                    />
                    <h3>{chat.username}</h3>
                    <p>7:34 PM</p>
                  </div>
                ))}
              </div>
              <div className="admin-panel">
                <img
                  src={
                    currentuser[0].avatarImage
                      ? `data:image/svg+xml;base64,${currentuser[0].avatarImage}`
                      : avatar
                  }
                  alt="avatar"
                />
                <h2>{currentuser[0].username}</h2>
              </div>
            </div>
            <ChatBox
              currentChat={currentChat}
              currentuser={currentuser}
              messagesArray={messagesArray}
              isUserOnline={isUserOnline}
              socket={socket}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Chats;
