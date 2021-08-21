import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

import Link from "components/core/Link";
import { BrandBase } from "types";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15,
    boxSizing: "border-box",
    "&:hover": {
      background: "#F3F3F3",
    },
  },

  avatar: {
    width: 38,
    height: 38,
  },

  name: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
  },
});

type Props = {
  brand: BrandBase;
  onClose: () => void;
};

const BrandSearchItem: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { brand, onClose } = props;

  return (
    <Link naked href={"/[brandSlug]"} as={`/${brand.slug}`} color="inherit" onClick={onClose}>
      <div className={classes.root}>
        {/* <Avatar className={classes.avatar} src={brand.image} /> */}
        <Avatar className={classes.avatar}>
          <Image src={brand.image} layout="fill" objectFit="cover" />
        </Avatar>

        <Typography className={classes.name} variant="body2">
          {brand.name}
        </Typography>
      </div>
    </Link>
  );
};

export default BrandSearchItem;
