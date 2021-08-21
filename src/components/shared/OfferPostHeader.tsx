import React from "react";

import Button from "@material-ui/core/Button";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";

import Actor from "components/shared/Actor";
import { OfferBase, UserBrand } from "types";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      justifyContent: "space-between",
      alignItems: "flex-start",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "stretch",
      },
    },

    link: {
      display: "flex",
      flex: 1,
    },

    right: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",

      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        marginTop: 5,
        flexDirection: "column",
      },
    },

    shopButton: {
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
        width: "100%;",
      },
    },
  });

type Props = WithStyles<typeof styles> & {
  brand: UserBrand;
  className?: string;
  haveFollowButton?: boolean;
  offer: OfferBase;
  onFollow?: (brand: UserBrand) => void;
  onShop?: (offer: OfferBase) => void;
};

const OfferPostHeader: React.FC<Props> = (props) => {
  const {
    brand,
    className, //
    classes,
    offer,
    onFollow = _.noop,
    onShop = _.noop,
    haveFollowButton = true,
  } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <Actor
        className={classes.link}
        brand={brand}
        haveFollowButton={haveFollowButton}
        offer={offer}
        onFollow={onFollow}
      />

      <div className={classes.right}>
        <Button
          className={classes.shopButton}
          component="a"
          target="_blank"
          href={`${offer.offerUrl}`}
          rel="noopener nofollow"
          variant="contained"
          disableElevation
          onClick={() => onShop(offer)}
        >
          SHOP
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles, {})(OfferPostHeader);
