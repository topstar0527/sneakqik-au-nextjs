/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";

import CouponCodeButton from "components/shared/CouponCodeButton";
import ExclusiveLabel from "components/shared/ExclusiveLabel";
import ExpiryTimer from "components/shared/ExpiryTimer";
import FreebieLabel from "components/shared/FreebieLabel";
import QIKLabel from "components/shared/QIKLabel";
import { OfferBase } from "types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: "1px solid rgb(0,0,0,0.1)",
  },
  media: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundColor: "#222222",
    backgroundPosition: "center",
    cursor: "pointer",
    padding: "calc(50% * 21 / 40) 50%",
  },
  demoMedia: {
    background: "#F3F3F3",
    height: 358,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("xs")]: {
      height: 180,
    },
  },
  cardBody: {
    display: "flex",
    backgroundColor: "#47CDD11A",
    alignItems: "center",
  },

  category: {
    height: "17px",
    borderRadius: "2px",
    opacity: "0.9",
    color: "#000000",
    border: "1px solid #999999",
    fontSize: "10px",
    lineHeight: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "16px",
    color: "#000000",
    marginBottom: "4px",
    marginTop: "2px",
  },

  expireOn: {
    marginBottom: "4px",
    fontSize: "13px",
  },
  expiryDate: {
    fontSize: "11px",
    opacity: 0.7,
  },

  primaryWebsite: {
    marginRight: "8px",
    color: "#000000",
    opacity: 0.9,
    paddingTop: 1,
  },

  couponContainer: {
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
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
}));

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type ExcludeType = {
  categoryName?: string;
  className?: string;
  headerImage?: string | File | null;
  image?: string | File | null; //
  onClick?: () => void;
  previewMode?: boolean;
  primaryWebsite: string;
};

type OfferPostProps = Overwrite<OfferBase, ExcludeType>;

const OfferContent: React.FunctionComponent<OfferPostProps> = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const { onClick = _.noop } = props;
  //!todo need to refactor
  const [previewImage, setImage] = React.useState<string>("");

  React.useEffect(() => {
    if (props.image instanceof File) {
      const imageFile: File = props.image;

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.addEventListener(
        "load",
        () => {
          setImage(reader.result as string);
        },
        false
      );
    }
    if (!props.image) {
      setImage("");
    }
  }, [props.image]);

  const { previewMode = false } = props;

  const image = typeof props.image === "string" ? props.image : previewImage;

  return (
    <Card className={clsx(classes.root, props.className)} elevation={0} ref={ref}>
      {/* Offer Header */}
      <Grid container alignItems="center" justify="space-between" spacing={2} className="p-3">
        <Grid item xs={12} sm={6}>
          <div className="flex flex-col">
            <div className="flex">
              {props.isExclusive && <ExclusiveLabel />}
              {props.isQikOffer && <QIKLabel />}
              {props.isFreebie && <FreebieLabel />}
            </div>

            <a href={`${props.offerUrl}`} target="_blank" rel="noopener nofollow" onClick={onClick}>
              <Typography className={classes.title} variant="body1">
                {props.title}
              </Typography>
            </a>
            <div className="flex">
              {!previewMode && props.primaryWebsite && (
                <MuiLink
                  className={classes.primaryWebsite}
                  target="_blank"
                  rel="noopener nofollow"
                  href={`${props.primaryWebsite}`}
                  variant="body2"
                  onClick={onClick}
                >
                  {props.primaryWebsite}
                </MuiLink>
              )}
              {previewMode && (
                <MuiLink className={classes.primaryWebsite} variant="body2">
                  {props.primaryWebsite?.split("://")[1].indexOf("www.") == -1 &&
                    "www." + props.primaryWebsite?.split("://")[1]}

                  {props.primaryWebsite?.split("://")[1].indexOf("www.") == 0 && props.primaryWebsite?.split("://")[1]}
                </MuiLink>
              )}

              <label className={classes.category}>{props.categoryName}</label>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} container alignItems="center" className={classes.couponContainer}>
          <Grid item xs={6}>
            {/* <div className="flex flex-col"> */}
            {props.isQikOffer ? (
              <ExpiryTimer date={props.expireDate} isSecond={true} />
            ) : (
              <>
                <Typography className={classes.expireOn} variant="body2">
                  <strong>Exp:</strong>
                </Typography>
                <Typography className={classes.expiryDate} variant="body1">
                  {moment(props.expireDate).format("DD-MMM-YYYY")}
                </Typography>
              </>
            )}
            {/* </div> */}
          </Grid>
          {props.couponCode && <CouponCodeButton couponCode={props.couponCode} offerUrl={props.offerUrl} />}
        </Grid>
      </Grid>

      {/* Offer Image */}
      {image ? (
        <div style={{ position: "relative" }}>
          <a href={`${props.offerUrl}`} target="_blank" rel="noopener nofollow" onClick={onClick}>
            {/* <CardMedia className={classes.media} image={image} title={props.title} /> */}
            <CardMedia className={classes.media} title={props.title}>
              <Image src={image} layout="fill" objectFit="contain" quality={50} />
            </CardMedia>
          </a>
          {props.isPrice && (
            <Typography className={classes.price} style={{ top: props.isQikOffer ? 50 : 10 }}>
              {`$${props.price}`}
            </Typography>
          )}
        </div>
      ) : previewMode ? (
        <div className={classes.demoMedia}>
          <Typography variant="body1" style={{ marginBottom: "14px" }}>
            <strong>Your Offer Preview</strong>
          </Typography>
          <Typography variant="body2" align="center" style={{ width: "180px" }}>
            This is how your offer will appear to others in their newsfeed.
          </Typography>
        </div>
      ) : null}
    </Card>
  );
});

export default OfferContent;
