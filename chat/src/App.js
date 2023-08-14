import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Chats from "./Components/Pages/Chats";
import Avatar from "./Components/Pages/Avatar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/" element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
