import React from "react";

function CommentPic({ comment }) {
  return (
    <img
      src={comment.client.client_image}
      alt={comment.client.client_name}
      className="w-full h-full object-cover rounded-full"
    />
  );
}

export default CommentPic;
