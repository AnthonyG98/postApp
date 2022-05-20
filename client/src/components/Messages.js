import React, { useState } from "react";
import axios from "axios";
function Messages() {
  const [searchUser, setSearchUser] = useState();
  const searchForUser = () => {
    axios.get(`http://localhost:3001/users/${searchUser}`).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="message-container">
      <div className="nav-container">
        <i class="fas fa-cog"></i>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a user"
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              searchForUser();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
