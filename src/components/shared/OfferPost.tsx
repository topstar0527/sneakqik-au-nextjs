import React from "react";

import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import clsx from "clsx";
import _ from "lodash";
import VisibilitySensor from "react-visibility-sensor";

import OfferPostHeader from "components/shared/OfferPostHeader";
import OfferContent from "components/shared/OfferViewer/OfferContent";
import OfferDescription from "components/shared/OfferViewer/OfferDescription";
import OfferSocialActions from "components/shared/OfferViewer/OfferSocialActions";
import { Category, OfferBase, UserBrand } from "types";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid #cccccc",
    background: "#FFFFFF",
  },

  main: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },

  header: {
    marginBottom: 12,
  },

  description: {
    marginTop: 12,
    marginBottom: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    "& button": {
      textTransform: "capitalize",
      fontWeight: "bold",
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

  stats: {
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
}));

type Props = {
  brand: UserBrand;
  className?: string;
  offer: any;
  onFollow?: (brand: UserBrand) => void;
  onMediaClick?: (offer) => void;
  onMediaShow?: (offer) => void;
  onSocialAction?: (action: string, offer: OfferBase) => void;
  previewMode?: boolean;
};

const OfferPost: React.FC<Props> = (props) => {
  const classes = useStyles();

  const {
    className,
    brand,
    offer,
    previewMode = false,
    onSocialAction = _.noop,
    onFollow = _.noop,
    onMediaClick = _.noop,
    onMediaShow = _.noop,
  } = props;

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      onMediaShow(offer);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <VisibilitySensor onChange={handleVisibilityChange} partialVisibility={true}>
        <div className={classes.main}>
          <OfferPostHeader
            className={classes.header}
            brand={brand}
            offer={offer}
            onFollow={() => onFollow(brand)}
            onShop={() => onMediaClick(offer)}
          />

          <OfferDescription className={classes.description} offer={offer} isPost previewMode={previewMode} />

          <OfferContent
            previewMode={previewMode}
            {...offer}
            primaryWebsite={brand.primaryWebsite}
            categoryName={(brand.category as Category).name}
            onClick={() => onMediaClick(offer)}
          />

          <CardContent className={classes.stats}>
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
        </div>
      </VisibilitySensor>

      <Divider />

      <OfferSocialActions
        onClick={(action) => {
          onSocialAction(action, offer);
        }}
        offer={offer}
      />
    </div>
  );
};

export default OfferPost;
