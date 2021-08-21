import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Image from "next/image";

import { GradientButton } from "components/Buttons";
import LikeButton from "components/core/LikeButton";
import { OfferBase } from "types";

const useStyles = makeStyles({
  root: {
    border: "1px solid rgb(0,0,0,0.1)",
  },

  media: {
    height: 358,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundColor: "#F0EDE2",
    backgroundPosition: "center",
  },

  stats: {
    padding: "0px 24px 0px 24px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #0000001A",

    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
      color: "#0000008A",
    },
  },

  stat: {
    display: "flex",
    alignItems: "center",
  },

  value: {
    marginLeft: 4,
  },

  cardActionArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    "& button": {
      textTransform: "capitalize",
      fontWeight: "bold",
    },
  },

  content: {
    display: "flex",
    justifyContent: "space-between",

    alignItems: "flex-start",

    minHeight: "82px",
    background: "rgba(71, 205, 209, 0.1)",
    padding: "15px 23px",
  },

  leftContent: {
    marginRight: "64px",
  },

  title: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#4A4A4A",
  },

  shopBtn: {
    width: "82px",
    height: "31px",
  },
});

const OfferPostCard: React.FunctionComponent<OfferBase> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* {props.image && <CardMedia className={classes.media} image={props.image} title={props.title} />} */}
      {props.image && (
        <CardMedia className={classes.media} title={props.title}>
          <Image src={props.image} layout="fill" objectFit="cover" />
        </CardMedia>
      )}

      <CardContent className={classes.content}>
        <div className={classes.leftContent}>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </div>

        <MuiLink href={props.offerUrl} rel="noopener" target="_blank">
          <GradientButton className={classes.shopBtn} variant="contained" disableElevation>
            Shop
          </GradientButton>
        </MuiLink>
      </CardContent>

      <CardContent className={classes.stats}>
        <div className={classes.stat}>
          <IconButton edge="end" color="secondary" aria-label="Like">
            <ThumbUpOutlinedIcon />
          </IconButton>
          <span className={classes.value}>{props.likesCount}</span>
        </div>

        <div className={classes.stat}>
          <IconButton edge="end" color="secondary" aria-label="Comment">
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
          <span className={classes.value}>{props.commentsCount}</span>
        </div>
      </CardContent>

      <CardActions className={classes.cardActionArea}>
        <LikeButton size="small" startIcon={<ThumbUpOutlinedIcon />}>
          Like
        </LikeButton>
        <LikeButton size="small" startIcon={<ChatBubbleOutlineOutlinedIcon />}>
          Comment
        </LikeButton>
        <LikeButton size="small" startIcon={<ShareOutlinedIcon />}>
          Share
        </LikeButton>
        <LikeButton size="small" startIcon={<BookmarkBorderOutlinedIcon />}>
          Save
        </LikeButton>
      </CardActions>
    </Card>
  );
};

export default OfferPostCard;
