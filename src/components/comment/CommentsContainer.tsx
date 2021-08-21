import React from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { readCommentsRequest, createCommentRequest } from "store/entities/actions";

import CommentBox from "./CommentBox";
import CommentsList from "./CommentsList";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C4C4C41A",
    padding: 20,
  },
});

const CommentsContainer = ({ autoFocus = false, offer }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const comments = offer.comments || [];

  React.useEffect(() => {
    dispatch(readCommentsRequest(offer));
  }, []);

  const handleSend = (msg: string) => {
    dispatch(
      createCommentRequest({
        offer: offer,
        comment: {
          message: msg,
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <CommentBox onSend={handleSend} autoFocus={autoFocus} />

      <Divider />

      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentsContainer;
