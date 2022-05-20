import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messages from "./components/Messages";
function App() {
  const [isAuth, setIsAuth] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
