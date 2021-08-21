import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import Image from "next/image";

import Link from "components/core/Link";
import { UserBrand } from "types";

export const styles = createStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    background: "#FFFFFF",
    border: "1px solid #EDEDED",
    boxShadow: "0px 4px 4px rgba(216, 216, 216, 0.25)",
    borderRadius: "2px",
  },

  avatar: {
    width: 60,
    height: 60,
  },

  name: {
    fontWeight: "bold",
    marginBottom: 8,
    width: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
  },

  btn: {
    width: "58px",
    height: "24px",
    border: "1px solid #7036D5",
    borderRadius: "2px",
    color: "#7036D5",
    fontSize: 10,
    lineHeight: "12px",
    padding: 0,
    marginBottom: 12,
  },
});

type Props = WithStyles<typeof styles> & {
  brand: UserBrand;
  onFollow?: (brand: UserBrand) => void;
};

const BrandCard: React.FC<Props> = (props) => {
  const { brand, classes, onFollow = _.noop } = props;

  return (
    <div className={classes.root}>
      <Link className="my-3" naked href={"/[brandSlug]"} as={`/${brand.slug}`} color="inherit">
        {/* <Avatar className={classes.avatar} src={brand.image} alt={brand.name} /> */}
        <Avatar className={classes.avatar} alt={brand.name}>
          <Image src={brand.image} layout="fill" objectFit="cover" />
        </Avatar>
      </Link>

      <Typography className={classes.name} variant="body2">
        {brand.name}
      </Typography>

      <p className="text-xs text-neutral opacity-40 mb-1">{brand.totalFollowers} followers</p>

      <p className="text-xs text-neutral opacity-40 mb-1">{brand.totalActiveOffers} offers</p>

      <Button className={classes.btn} variant="outlined" disableElevation onClick={() => onFollow(brand)}>
        {brand.isFollowed ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default withStyles(styles, { name: "BrandCard" })(BrandCard);
