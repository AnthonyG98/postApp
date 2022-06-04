import React from "react";
import { Image } from "cloudinary-react";
function ChatProps(props) {
  return (
    <div className="chat-container">
      <Image
        className="inboxImg"
        cloudName="delktfw1a"
        publicId={props.profileImg}
      />{" "}
      <p>{props.message}</p>
    </div>
  );
}

export default ChatProps;
