import React from "react";
import { Image } from "cloudinary-react";
function MessagesProps(props) {
  return (
    <div className="msg-props-container">
      <div className="msg-props-img">
        <Image
          className="inboxImg"
          cloudName="delktfw1a"
          publicId={props.profileImg}
        />{" "}
      </div>
    </div>
  );
}

export default MessagesProps;
