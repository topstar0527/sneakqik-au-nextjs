import React from "react";

import IconButton from "@material-ui/core/IconButton";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import clsx from "clsx";
import _ from "lodash";

import { OfferBase } from "types";
import { generateShareLink } from "utils";

export const styles = createStyles({
  stats: {
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
      color: "#0000008A",
    },
  },

  stat: {
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root": {
      padding: 8,
    },
  },

  value: {
    marginLeft: 8,
  },
});

type Props = WithStyles<typeof styles> & {
  className?: string;
  offer: OfferBase;
  onClick?: (action: string) => void;
};

const OfferCardSocialButtonGroup: React.FunctionComponent<Props> = (props) => {
  const { className, classes, offer, onClick = _.noop } = props;

  React.useEffect(() => {
    if (window.a2a && window.a2a.init_all) {
      window.a2a.init_all();
    }
  }, []);

  return (
    <div className={clsx(classes.stats, className)}>
      <div className={classes.stat}>
        <IconButton onClick={() => onClick("like")} edge="end" color="secondary" aria-label="Like">
          {props.offer && props.offer.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        </IconButton>
        <span className={classes.value}>{offer.likesCount}</span>
      </div>

      <div className={classes.stat}>
        <IconButton
          onClick={() => onClick("comment")} //
          edge="end"
          color="secondary"
          aria-label="Comment"
        >
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <span className={classes.value}>{offer.commentsCount}</span>
      </div>

      <div className={classes.stat}>
        <IconButton
          onClick={() => onClick("share")}
          edge="end"
          color="secondary"
          aria-label="Share"
          className="a2a_dd"
          href="https://www.addtoany.com/share"
          data-a2a-url={generateShareLink("offer", offer)}
          data-a2a-title={offer.title}
        >
          <ShareOutlinedIcon />
        </IconButton>
        <span className={classes.value}>{offer.sharesCount}</span>
      </div>
    </div>
  );
};

export default withStyles(styles)(OfferCardSocialButtonGroup);
