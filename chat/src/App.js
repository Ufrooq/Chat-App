import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Chats from "./Components/Pages/Chats";
import Avatar from "./Components/Pages/Avatar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/avatar" element={<Avatar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
