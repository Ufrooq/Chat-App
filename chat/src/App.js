import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Chats from "./Components/Pages/Chats";
import Avatar from "./Components/Pages/Avatar";
import { createContext, useState } from "react";
import "./App.scss";
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export const globalcontext = createContext();
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  function mouseFollower() {
    document.addEventListener("mousemove", (mouseDetails) => {
      document.getElementById("mini-circle").style.transform = `translate(${
        mouseDetails.clientX - 10
      }px,${mouseDetails.clientY - 10}px)`;
    });
  }
  // mouseFollower();
  return (
    <globalcontext.Provider value={{ isLoggedIn, setisLoggedIn }}>
      <div className="App">
        {/* <div id="mini-circle"></div> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chats socket={socket} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/avatar" element={<Avatar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </globalcontext.Provider>
  );
}

export default App;
