import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";

import Link from "components/core/Link";
import { OfferBase, UserBrand } from "types";

const styles = createStyles({
  root: {
    display: "inline-flex",
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 12,
    border: "1px solid #DDDDDD",
  },

  meta: {},

  brandName: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 4,

    "& button": {
      color: "#7036D5",
      borderColor: "#7036D5",
      fontSize: 11,
      lineHeight: "14px",
      height: 28,
      marginLeft: 10,
      padding: 8,
    },
  },

  name: {
    lineHeight: "23px",
    fontSize: 15,
    fontWeight: "bold",
  },

  tagline: {
    fontSize: 12,
    lineHeight: "11px",
  },

  time: {
    fontSize: 12,
    lineHeight: "14px",
    color: "#7d7d7d",
  },
});

type Props = WithStyles<typeof styles> & {
  brand: UserBrand;
  className?: string;
  haveFollowButton?: boolean;
  offer: OfferBase;
  onFollow?: (brand: UserBrand) => void;
};

const Actor: React.FC<Props> = (props) => {
  const {
    className, //
    classes,
    brand,
    offer,
    onFollow = _.noop,
    haveFollowButton = true,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onFollow(brand);
  };

  return (
    <Link naked className={clsx(classes.root, className)} href="/[brandSlug]" as={`/${brand.slug}`}>
      {/* <Avatar className={classes.avatar} src={brand.image} alt={brand.name} /> */}
      <Avatar className={classes.avatar} alt={brand.name}>
        <Image src={brand.image} layout="fill" objectFit="contain" />
      </Avatar>

      <div className={classes.meta}>
        <div className={classes.brandName}>
          <Typography className={classes.name}>{brand.name}</Typography>
          {haveFollowButton && (
            <Button variant="outlined" onClick={handleClick}>
              {brand.isFollowed ? "FOLLOWING" : "FOLLOW"}
            </Button>
          )}
        </div>

        <Typography gutterBottom className={classes.tagline}>
          {brand.tagline}
        </Typography>

        <Typography gutterBottom className={classes.time}>
          {moment(offer.publishedDate ?? moment()).fromNow()}
        </Typography>
      </div>
    </Link>
  );
};

export default withStyles(styles, { name: "Actor" })(Actor);
