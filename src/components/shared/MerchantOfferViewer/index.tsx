import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import VisibilitySensor from "react-visibility-sensor";

import { GradientButton } from "components/Buttons";
import CommentContainer from "components/comment/CommentsContainer";
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
    flex: 1,
    marginRight: "24px",

    [theme.breakpoints.down("xs")]: {
      marginRight: "inherit",
    },
  },
  rightSidebar: {
    width: 278,
    [theme.breakpoints.down("xs")]: {
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
    width: "82px",
    height: "31px",
    marginLeft: 24,

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  post: {
    marginTop: 12,
  },
}));

type Props = {
  brand: UserBrand;
  offer: OfferBase;
  onMediaClick?: (offer) => void;
  onMediaShow?: (offer) => void;
  onSocialAction?: (action: string, offer: OfferBase) => void;
};

const OfferViewer: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { brand, offer, onSocialAction = _.noop, onMediaClick = _.noop, onMediaShow = _.noop } = props;

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      onMediaShow(offer);
    }
  };

  return (
    <>
      <Actor brand={brand} offer={offer} haveFollowButton={false} />
      <div className={classes.body}>
        <div className={classes.leftSidebar}>
          <div className={classes.description}>
            <OfferDescription className={classes.desc} offer={props.offer} />
            <GradientButton
              className={classes.shopButton}
              href={props.offer.offerUrl}
              variant="contained"
              disableElevation
            >
              Shop
            </GradientButton>
          </div>

          <VisibilitySensor onChange={handleVisibilityChange}>
            <OfferContent
              {...props.offer}
              className={classes.post}
              previewMode={false}
              primaryWebsite={props.brand.primaryWebsite}
              categoryName={(props.brand.category as Category).name}
              onClick={() => onMediaClick(offer)}
            />
          </VisibilitySensor>

          <OfferSocialActions
            offer={offer}
            onClick={(action) => {
              onSocialAction(action, offer);
            }}
          />

          <Typography className={classes.discussion} variant="h6" component="h6">
            Comments
          </Typography>
          <CommentContainer offer={offer} />
        </div>
      </div>
    </>
  );
};

export default OfferViewer;
