/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import { useSelector } from "react-redux";
import Truncate from "react-truncate";
import VisibilitySensor from "react-visibility-sensor";

import CouponCodeButton from "components/shared/CouponCodeButton";
import ExclusiveLabel from "components/shared/ExclusiveLabel";
import ExpiryTimer from "components/shared/ExpiryTimer";
import FreebieLabel from "components/shared/FreebieLabel";
import OfferCardSocialButtonGroup from "components/shared/OfferCardSocialButtonGroup";
import QIKLabel from "components/shared/QIKLabel";
import { getUser } from "store/auth/reducer";
import { OfferBase } from "types";

export const styles = () =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      opacity: (props: OfferCardProps) => (moment(props.offer.expireDate).isAfter(moment()) ? "1" : "0.6"),
    },

    cardContainer: {
      borderRadius: 18,
      boxShadow: "0px 8px 4px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      borderTop: "1px solid #ddd",
    },

    media: {
      padding: "calc(50% * 28 / 40 + 20px) 50%",
      position: "relative",
      transform: "translateZ(0)",
    },

    overlay: {
      backgroundBlendMode: "multiply",
      backgroundColor: "#aaaaaa",
      transition: "0.2s ease",
      "&:hover": {
        backgroundColor: "#ffffff",
      },
    },

    QIKLabel: {
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 8px",
      alignItems: "center",
      background: "white",
    },

    FreebieLabel: {
      background: "rgb(209, 170, 71, 0.15)",
      display: "inline-block",
      padding: "2px",
    },

    ExclusiveLabel: {
      background: "#e0e0e0",
      display: "inline-block",
      padding: "2px",
    },

    moreBtn: {
      position: "absolute",
      top: "-8px",
      right: 0,
      zIndex: 1,
    },

    price: {
      padding: "3.5px 8.6px",
      background: "#999999",
      position: "absolute",
      right: "8px",
      top: "56px",
      borderRadius: "2px",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "bold",
    },

    expiryLabel: {
      fontSize: "10px",
      lineHeight: "12px",
      color: "#4A4A4A",
      minHeight: "12px",
      textAlign: "left",
    },

    coupon: {
      display: "flex",
      flexDirection: "column",
    },

    author: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "inline-block",
      width: "100%",
    },

    couponCode: {
      width: 70,
      height: 23,
      fontSize: 14,
      lineHeight: "16px",
      marginBottom: "1px",
      padding: "3px",
    },

    couponLabel: {
      fontSize: "11px",
      lineHeight: "12px",
      marginLeft: 6,
    },

    loginToSeeButton: {
      height: 24,
      lineHeight: "12px",
      flexShrink: 0,
      marginRight: 4,

      "& .MuiButton-iconSizeMedium > *:first-child": {
        fontSize: 13,
      },
    },

    timer: {
      "& > li:last-child": {
        paddingRight: 0,
      },
      "& > li": {
        "& > .unit": {
          fontSize: 10,
        },
        "& > .value": {
          fontSize: 12,
        },
      },
    },

    logoContainer: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      position: "absolute",
      bottom: 5,
      left: 5,
      overflow: "hidden",
      border: "1px solid white",
    },

    logo: {
      width: "100%",
      height: "100%",
    },

    title: {
      fontSize: 14,
      width: "90%",
    },

    moreText: {
      // display: "block",
      // paddingTop: 2,
      color: "#aaa",
      cursor: "pointer",
    },
  });

type OfferCardProps = {
  brandLogo: string | null;
  brandName: string;
  className?: string;
  hasOverlay?: boolean;
  hasPostByLabel?: boolean;
  offer: OfferBase;
  onMediaClick?: (offer) => void;
  onMediaShow?: (offer) => void;
  onMoreClick?: (e: React.MouseEvent<HTMLButtonElement>, offer: OfferBase) => void;
  onSocialAction?: (action: string, offer: OfferBase) => void;
  onView?: (offer: OfferBase) => void;
  showLogo?: boolean;
};

type OfferCardPropsWithStyles = WithStyles<typeof styles> & OfferCardProps;

const UserOfferCard: React.FC<OfferCardPropsWithStyles> = (props) => {
  const user = useSelector(getUser);
  const [titleTextTruncated, setTitleTextTruncated] = React.useState<boolean>(false);

  const {
    showLogo,
    brandLogo,
    brandName,
    hasPostByLabel = true,
    offer,
    className,
    classes,
    hasOverlay,
    onSocialAction = _.noop,
    onMediaShow = _.noop,
    onMediaClick = _.noop,
    onView = _.noop,
    onMoreClick = _.noop,
  } = props;

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      onMediaShow(offer);
    }
  };

  const handleMore = (e) => {
    e.preventDefault();
    onView(offer);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Card className={classes.cardContainer}>
        <VisibilitySensor onChange={handleVisibilityChange}>
          <CardActionArea
            href={offer.offerUrl}
            rel="noopener nofollow"
            target="_blank"
            onClick={() => onMediaClick(offer)}
          >
            {/* <CardMedia
              className={clsx(classes.media, hasOverlay && classes.overlay)}
              image={offer.image || brandLogo || ""}
              title={offer.title}
            > */}
            <CardMedia className={clsx(classes.media, hasOverlay && classes.overlay)} title={offer.title}>
              <Image src={offer.image || brandLogo || ""} layout="fill" objectFit="cover" />
              <div className="absolute right-0 top-0 left-0">
                {offer.isQikOffer && (
                  <div className={classes.QIKLabel}>
                    <QIKLabel aligned={true} />
                    <ExpiryTimer classes={{ root: classes.timer }} date={offer.expireDate} isSecond={true} />
                  </div>
                )}

                {offer.isExclusive && (
                  <div className="my-2">
                    <div className={classes.ExclusiveLabel}>
                      <ExclusiveLabel />
                    </div>
                  </div>
                )}

                {offer.isFreebie && (
                  <div className="my-2">
                    <div className={classes.FreebieLabel}>
                      <FreebieLabel />
                    </div>
                  </div>
                )}
              </div>
              {offer.isPrice && (
                <Typography className={classes.price} style={{ top: offer.isQikOffer ? 50 : 10 }}>
                  {`$${offer.price}`}
                </Typography>
              )}

              {showLogo && (
                <div className={classes.logoContainer}>
                  {/* <img src={brandLogo || ""} className={classes.logo} /> */}
                  <Image src={brandLogo || ""} layout="fill" objectFit="contain" />
                </div>
              )}
            </CardMedia>
          </CardActionArea>
        </VisibilitySensor>

        <div className="px-3 pb-0 relative">
          <div className={clsx("my-2 font-bold h-8", classes.title)}>
            <Truncate
              lines={2}
              ellipsis={
                <span>
                  ...{" "}
                  <span className={classes.moreText} onClick={(e) => handleMore(e)}>
                    more
                  </span>
                </span>
              }
              onTruncate={(isTruncated) => {
                if (titleTextTruncated !== isTruncated) {
                  setTitleTextTruncated(isTruncated);
                }
              }}
            >
              <div>{offer.title}</div>
            </Truncate>
            {!titleTextTruncated && (
              <span className={classes.moreText} onClick={(e) => handleMore(e)}>
                {" "}
                more
              </span>
            )}

            <IconButton
              className={classes.moreBtn}
              size="small"
              aria-label="card-menu"
              onClick={(e) => onMoreClick(e, offer)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>

          {hasPostByLabel && (
            <div className="my-2">
              <span className={classes.author}>
                Posted by <strong>{brandName}</strong>
              </span>
            </div>
          )}

          <div className="my-2 flex items-center justify-between h-10">
            {props.offer.couponCode && (
              <CouponCodeButton
                classes={{
                  root: classes.coupon,
                  couponCode: classes.couponCode,
                  couponLabel: classes.couponLabel,
                  loginToSeeButton: classes.loginToSeeButton,
                }}
                couponCode={props.offer.couponCode}
                offerUrl={props.offer.offerUrl}
                label="GET CODE"
              />
            )}

            <span className={classes.expiryLabel} style={!user ? { textAlign: "left" } : { textAlign: "center" }}>
              {props.offer.expireDate &&
                (moment(props.offer.expireDate).isAfter(moment())
                  ? `${moment(props.offer.expireDate).format("DD-MMM-YYYY")}`
                  : `Expired`)}
            </span>
          </div>

          <OfferCardSocialButtonGroup
            className="my-2"
            offer={props.offer}
            onClick={(action) => {
              onSocialAction(action, offer);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default withStyles(styles, { name: "UserOfferCard" })(UserOfferCard);
