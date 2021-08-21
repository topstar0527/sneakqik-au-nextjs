/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MuiLink from "@material-ui/core/Link";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import { useSelector } from "react-redux";
import Truncate from "react-truncate";

import CouponCodeButton from "components/shared/CouponCodeButton";
import ExclusiveLabel from "components/shared/ExclusiveLabel";
import ExpiryTimer from "components/shared/ExpiryTimer";
import FreebieLabel from "components/shared/FreebieLabel";
import OfferCardSocialButtonGroup from "components/shared/OfferCardSocialButtonGroup";
import QIKLabel from "components/shared/QIKLabel";
import { getUser } from "store/auth/reducer";
import { MerchantBrand, OfferBase } from "types";

export const styles = () =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      opacity: (props: MerchantOfferCardProps) => (moment(props.offer.expireDate).isAfter(moment()) ? "1" : "0.4"),
    },

    cardContainer: {
      borderRadius: 18,
      boxShadow: "0px 8px 4px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      borderTop: "1px solid #ddd",
    },
    media: {
      padding: "calc(50% * 28 / 40 + 20px) 50%",
      position: "relative",
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
      padding: "3.5px 2.6px",
      background: "#ffffff",
      position: "absolute",
      right: "8px",
      top: "56px",
      borderRadius: "2px",
      color: "#000000",
      fontSize: "12px",
      fontWeight: "bold",
      marginTop: "4px",
    },

    expiryLabel: {
      fontSize: "11px",
      lineHeight: "12px",
      color: "#4A4A4A",
      minHeight: "12px",
      textAlign: "left",
    },

    coupon: {
      display: "flex",
      flexDirection: "column",
    },

    couponCode: {
      width: 90,
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
      width: "fit-content",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
      fontSize: 9,
      height: 24,
      "& .MuiButton-startIcon": {
        display: "inherit",
        marginLeft: -4,
        marginRight: 2,
      },
      "& .MuiButton-iconSizeMedium > *:first-child": {
        fontSize: 12,
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
    moreText: {
      color: "#aaa",
      cursor: "pointer",
    },
  });

type MerchantOfferCardProps = {
  brand: MerchantBrand;
  className?: string;
  editable?: boolean;
  offer: OfferBase;
  onMoreClick?: (e: React.MouseEvent<HTMLButtonElement>, offer: OfferBase) => void;
  onSocialAction?: (action: string, offer: OfferBase) => void;
  onView?: (slug: string) => void;
};

type MerchantOfferCardPropsWithStyles = WithStyles<typeof styles> & MerchantOfferCardProps;

const MerchantOfferCard: React.FC<MerchantOfferCardPropsWithStyles> = (props) => {
  const { brand, className, classes, offer, onSocialAction = _.noop, onMoreClick = _.noop, onView = _.noop } = props;

  const user = useSelector(getUser);

  const [titleTextTruncated, setTitleTextTruncated] = React.useState<boolean>(false);

  const handleMore = (e: React.MouseEvent) => {
    e.preventDefault();
    onView(offer.slug);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Card className={classes.cardContainer}>
        <CardActionArea>
          <MuiLink href={offer.offerUrl} rel="noopener nofollow" target="_blank">
            {/* <CardMedia className={classes.media} image={offer.image || brand.image || ""} title={offer.title}> */}
            <CardMedia className={classes.media} title={offer.title}>
              <Image src={offer.image || brand.image || ""} layout="fill" objectFit="cover" />
              <div className="absolute right-0 top-0 left-0">
                {offer.isQikOffer && (
                  <div className={classes.QIKLabel}>
                    <QIKLabel />
                    <ExpiryTimer date={offer.expireDate} isSecond />
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
            </CardMedia>
          </MuiLink>
        </CardActionArea>

        <div className="px-3 pb-0 relative">
          <div className="my-2">
            <a href={offer.offerUrl} target="_blank" rel="noopener nofollow">
              <div className="font-bold mr-3 text-sm h-8">
                <Truncate
                  lines={2}
                  ellipsis={
                    <span>
                      ...{" "}
                      <span className={classes.moreText} onClick={handleMore}>
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
                  <span className={classes.moreText} onClick={handleMore}>
                    {" "}
                    more
                  </span>
                )}
              </div>
            </a>
            <IconButton
              className={classes.moreBtn}
              size="small"
              aria-label="card-menu"
              onClick={(e) => onMoreClick(e, offer)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>

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
              />
            )}

            <span className={classes.expiryLabel} style={!user ? { textAlign: "left" } : { textAlign: "right" }}>
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

export default withStyles(styles, { name: "MerchantOfferCard" })(MerchantOfferCard);
