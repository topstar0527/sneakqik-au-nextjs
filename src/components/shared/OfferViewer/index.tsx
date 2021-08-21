import React from "react";

import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import _ from "lodash";

import BrandSuggestionSection from "components/brand/BrandSuggestionSection";
import CommentsContainer from "components/comment/CommentsContainer";
import Actor from "components/shared/Actor";
import OfferContent from "components/shared/OfferViewer/OfferContent";
import OfferDescription from "components/shared/OfferViewer/OfferDescription";
import OfferSocialActions from "components/shared/OfferViewer/OfferSocialActions";
import { UserBrand, OfferBase, Category } from "types";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexWrap: "wrap",
  },
  leftSidebar: {
    width: "100%",
    flex: 1,
    marginRight: "24px",

    [theme.breakpoints.down("xs")]: {
      marginRight: "inherit",
    },
  },
  rightSidebar: {
    marginTop: -32,
    width: 278,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      width: "100%",
    },
  },
  discussion: {
    marginTop: "24px",
    marginBottom: "10px",
  },

  description: {
    marginTop: 12,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  desc: {
    flex: 1,
  },

  shopButton: {
    marginLeft: 24,
    width: "82px",
    height: "31px",
    fontSize: 13,
    color: "#FFFFFF",
    borderRadius: "2px",
    background: "linear-gradient(270deg, #42CFD0 0%, rgba(255, 255, 255, 0) 98.35%), #6E33D4",
    "&:hover": {
      background: "linear-gradient(270deg, #42CFD0 0%, rgba(255, 255, 255, 0) 98.35%), #6E33D4",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  socialStats: {
    padding: "12px 20px 12px 20px !important",

    "& ul": {
      display: "flex",
      margin: "0",
      padding: "0",
      listStyle: "none",
    },
    "& li": {
      paddingRight: 37,
      display: "flex",
      alignItems: "center",

      "& svg": {
        fontSize: 14,
        color: "#4A4A4A99",
      },

      "& span": {
        paddingLeft: 4,
        fontSize: 15,
      },
    },
  },
  likeCircle: {
    backgroundColor: "#6E33D4",
    borderRadius: "50%",
    width: 16,
    height: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 2,
  },
  post: {
    marginTop: 12,
  },
}));

type Props = {
  autoFocus?: boolean;
  brand: UserBrand;
  className?: string;
  isModal?: boolean;
  offer: OfferBase;
  onFollow?: (brand: UserBrand) => void;
  onMediaClick?: (offer) => void;
  onMediaShow?: (offer) => void;
  onSocialAction?: (action: string, offer: OfferBase) => void;
};

const OfferViewer: React.FC<Props> = (props) => {
  const classes = useStyles();

  const {
    autoFocus = false,
    brand,
    isModal = false,
    offer,
    onSocialAction = _.noop,
    onMediaClick = _.noop,
    onMediaShow = _.noop,
    onFollow = _.noop,
  } = props;

  React.useEffect(() => {
    onMediaShow(offer);
  }, []);

  return (
    <>
      <Actor brand={brand} offer={offer} onFollow={onFollow} />
      <div className={classes.body}>
        <div className={classes.leftSidebar}>
          <div className={classes.description}>
            <OfferDescription className={classes.desc} offer={props.offer} isPost={isModal} />
            <Button
              className={classes.shopButton}
              component="a"
              target="_blank"
              href={`${offer.offerUrl}`}
              rel="noopener nofollow"
              variant="contained"
              disableElevation
              onClick={() => onMediaClick(offer)}
            >
              Shop
            </Button>
          </div>
          <OfferContent
            {...props.offer}
            className={classes.post}
            previewMode={false}
            primaryWebsite={props.brand.primaryWebsite}
            categoryName={(props.brand.category as Category).name}
            onClick={() => onMediaClick(offer)}
          />

          <CardContent className={classes.socialStats}>
            <ul>
              <li>
                {offer.likesCount > 0 ? (
                  <span className={classes.likeCircle}>
                    <ThumbUpAltIcon style={{ color: "#fff", fill: "white" }} />
                  </span>
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
                <span>{offer.likesCount}</span>
              </li>
              <li>
                <ChatBubbleOutlineOutlinedIcon />
                <span>{offer.commentsCount}</span>
              </li>
              <li>
                <ShareOutlinedIcon />
                <span>{offer.sharesCount}</span>
              </li>
              <li>
                <BookmarkBorderOutlinedIcon />
                <span>{offer.savesCount}</span>
              </li>
            </ul>
          </CardContent>

          <OfferSocialActions
            offer={offer}
            onClick={(action) => {
              onSocialAction(action, offer);
            }}
          />
          <Typography className={classes.discussion} variant="h6" component="h6">
            Comments
          </Typography>
          <CommentsContainer offer={offer} autoFocus={autoFocus} />
        </div>

        <div className={classes.rightSidebar}>
          <BrandSuggestionSection brand={brand} offer={offer} />
        </div>
      </div>
    </>
  );
};

export default OfferViewer;
