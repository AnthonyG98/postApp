import React from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
function MessagesProps(props) {
  const getChat = () => {
    //     axios
    //       .get(`http://localhost:3001/message/chat/${props.chatId}`)
    //       .then((response) => {
    //         console.log(response);
    //       });
  };
  return (
    <div className="msg-props-container">
      <div className="msg-props-img">
        <Image
          className="inboxImg"
          cloudName="delktfw1a"
          publicId={props.profileImg}
          onClick={props.getChat}
        />{" "}
      </div>
    </div>
  );
}

export default MessagesProps;
