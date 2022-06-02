import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import MessagesProps from "./MessagesProps";
function Messages() {
  const [searchUser, setSearchUser] = useState();
  const [chatId, setChatId] = useState();
  const [results, setResults] = useState();
  const [profileImg, setProfileImg] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [image, setImage] = useState();
  const [senderProfileImage, setSenderProfileImage] = useState();
  const [searchUserId, setSearchUserId] = useState();
  const [inbox, setInbox] = useState();
  const searchForUser = () => {
    axios.get(`http://localhost:3001/users/${searchUser}`).then((response) => {
      console.log(response);
      setResults(response.data.username);
      setSenderProfileImage(response.data.profile_picture);
      setSearchUserId(response.data.id);
    });
  };
  const getLeftInbox = (thisUserId) => {
    axios
      .get(`http://localhost:3001/message/inbox/${thisUserId}`)
      .then((response) => {
        console.log(response);
        setInbox(
          response.data.map((el) => {
            return <MessagesProps profileImg={el.sender_profile_picture} />;
          })
        );
      });
  };
  const getMyInbox = (thisUserId) => {
    axios
      .get(`http://localhost:3001/message/more/${thisUserId}`)
      .then((response) => {
        console.log(response);
        setInbox(
          response.data.map((el) => {
            return <MessagesProps profileImg={el.receiver_profile_picture} />;
          })
        );
      });
  };
  const getUser = () => {
    axios
      .get(`http://localhost:3001/users/${localStorage.getItem("username")}`)
      .then((response) => {
        setProfileImg(response.data.profile_picture);
        setUserId(response.data.id);
        getLeftInbox(response.data.id);
        getMyInbox(response.data.id);
        //When click on user inbox pic, set UserId and Sender to null
      });
  };

  const openResultsContainer = () => {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.style.display = "flex";
  };
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setChatId(result);
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.style.display = "none";
  }
  const sendMessage = () => {
    const messageData = {
      message: message,
      chatId: chatId,
      sender_profile_picture: profileImg,
      receiver_profile_picture: senderProfileImage,
      sender: searchUserId,
      UserId: userId,
    };
    axios
      .post("http://localhost:3001/message", messageData)
      .then((response) => {
        console.log(response);
        console.log(searchUserId);
      });
  };
  const changeProfileImg = () => {
    const imgFormData = new FormData();
    imgFormData.append("file", image);
    imgFormData.append("upload_preset", "fy5ahm9g");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/delktfw1a/image/upload`,
        imgFormData
      )
      .then((response) => {
        const fileName = response.data.public_id;
        const imageData = {
          profile_picture: fileName,
        };

        axios
          .put(`http://localhost:3001/users/profile/${userId}`, imageData)
          .then((response) => {
            //  const changePostPicure = () => {
            //  };
            //  changePostPicure();
            const postImageData = {
              userId: userId,
              profile_picture: fileName,
            };
            axios
              .put(
                `http://localhost:3001/post/profile/${userId}`,
                postImageData
              )
              .then((response) => {
                console.log(response);
              });
          });
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="message-container">
        <div className="nav-container">
          <div className="change-profileImg">
            <Image
              className="profileImg"
              cloudName="delktfw1a"
              publicId={profileImg}
            />{" "}
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <button
              onClick={() => {
                changeProfileImg();
              }}
            >
              Change
            </button>
          </div>

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
                openResultsContainer();
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
          publicId={senderProfileImage}
        />{" "}
        <h1 className="login-head">{results}</h1>
        <button
          className="search-btn"
          id="results-btn"
          onClick={() => {
            generateString(8);
          }}
        >
          Message
        </button>
      </div>
      <div className="messaging-container">
        <div className="inbox-container">{inbox}</div>
        <div className="messages">
          <div className="messages-send">
            <input
              type="text"
              className="message-input"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button className="send-msg-btn" onClick={sendMessage}>
              <i class="fas fa-paper-plane"></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
