import React from "react";

import CommentItem from "./CommentItem";

type Props = {
  comments: string[];
};

const CommentsList: React.FC<Props> = (props) => {
  const { comments } = props;

  return (
    <div>
      {comments.map((commentId) => (
        <CommentItem key={commentId} commentId={commentId} />
      ))}
    </div>
  );
};

export default CommentsList;
