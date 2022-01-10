import './App.css';
import { useState } from "react"
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import profileUrl from "./components/Dashboard"
import {
       BrowserRouter as Router,
       Routes,
       Route
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import OtherUser from './components/OtherUser';
function App() {
       const [ isAuth, setIsAuth ] = useState();
  return (
    <>
       <Router>
              <Routes>
                     <Route path="/"  element={<Login/>} />
                     <Route path="/signup" element={<Signup/>}/>
                     <Route path="/dashboard" element={<Dashboard/>}/>
                     <Route path="/profile" element={<Profile />}/>
                     <Route path={"/:username"} exact element={<OtherUser />}/>
              </Routes>
       </Router>
    </>
  );
}

export default App;
