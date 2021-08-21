import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "20px 0 14px",
  },
  avatar: {
    width: 73,
    height: 73,
    marginRight: 8,
  },
  brands: {
    display: "flex",
  },
});

export default function RelatedBrands() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title}>Related Brands</Typography>
      <div className={classes.brands}>
        <Avatar className={classes.avatar} alt="YS" src="/images/ys.svg" />
        <Avatar className={classes.avatar} alt="YS" src="/images/ys.svg" />
      </div>
    </div>
  );
}
