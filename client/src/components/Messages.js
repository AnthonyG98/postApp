import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
function Messages() {
  const [searchUser, setSearchUser] = useState();
  const [results, setResults] = useState();
  const [profileImg, setProfileImg] = useState();
  const searchForUser = () => {
    axios.get(`http://localhost:3001/users/${searchUser}`).then((response) => {
      console.log(response);
      setResults(response.data.username);
      const searchResults = document.getElementById("search-results");
      searchResults.style.display = "flex";
    });
  };
  const getUser = () => {
    axios
      .get(`http://localhost:3001/users/${localStorage.getItem("username")}`)
      .then((response) => {
        console.log(response);
        setProfileImg(response.data.profile_picture);
      });
  };
  const openResultsContainer = () => {
    const resultsContainer = document.querySelector(
      ".search-results-container"
    );
    resultsContainer.style.display = "block";
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="message-container">
        <div className="nav-container">
          <Image
            className="profileImg"
            cloudName="delktfw1a"
            publicId={profileImg}
          />{" "}
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search for a user"
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
              onClick={openResultsContainer}
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
      <div className="search-res-container" id="search-results">
        <Image
          className="searchImg"
          cloudName="delktfw1a"
          publicId={profileImg}
        />{" "}
        <h1 className="login-head">{results}</h1>
        <button className="search-btn" id="results-btn">
          Message
        </button>
      </div>
      <div className="messaging-container">
        <div className="inbox-container"></div>
        <div className="messages">
          <div className="messages-send">
            <input type="text" className="message-input" />
            <button className="send-msg-btn">
              <i class="fas fa-paper-plane"></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
