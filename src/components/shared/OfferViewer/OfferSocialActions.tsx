import React from "react";

import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import clsx from "clsx";
import _ from "lodash";

import LikeButton from "components/core/LikeButton";
import { OfferBase } from "types";
import { generateShareLink } from "utils";

const useStyles = makeStyles(() => ({
  root: {
    border: "none",
    flexDirection: "row",
    justifyContent: "space-evenly",

    "& button": {
      textTransform: "capitalize",
      fontSize: 14,
    },
  },
}));

type Props = {
  className?: string;
  offer: OfferBase;
  onClick?: (action: string) => void;
};

const OfferSocialActions: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { offer, onClick = _.noop } = props;

  React.useEffect(() => {
    if (window.a2a && window.a2a.init_all) {
      window.a2a.init_all();
    }
  }, []);

  return (
    <CardActions className={clsx(classes.root, props.className)}>
      <LikeButton
        onClick={() => onClick("like")}
        size="small"
        startIcon={props.offer && props.offer.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
      >
        Like
      </LikeButton>
      <LikeButton
        onClick={() => onClick("comment")} //
        size="small"
        startIcon={<ChatBubbleOutlineOutlinedIcon />}
      >
        Comment
      </LikeButton>
      <LikeButton
        onClick={() => onClick("share")}
        size="small"
        startIcon={<ShareOutlinedIcon />}
        className="a2a_dd"
        href="https://www.addtoany.com/share"
        data-a2a-url={generateShareLink("offer", offer)}
        data-a2a-title={offer.title}
      >
        Share
      </LikeButton>
      <LikeButton
        onClick={() => onClick("save")}
        size="small"
        startIcon={props.offer.isSaved ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
      >
        Save
      </LikeButton>
    </CardActions>
  );
};

export default OfferSocialActions;
