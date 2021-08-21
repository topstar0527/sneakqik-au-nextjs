import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoText: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "21px",
    color: "#FFF",
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.up("sm")]: {
      fontSize: "35px",
      lineHeight: "36px",
    },
  },

  logoIcon: {
    color: "#FFF",
    fill: "transparent",
    width: "26px",
    height: "17px",
    marginRight: "8 px",

    [theme.breakpoints.up("sm")]: {
      width: "42px",
      height: "27px",
    },
  },
}));

export type SneakQIKLogoProps = {
  className?: string;
  classes?: object;
};

const SneakQIKLogo: React.FunctionComponent<SneakQIKLogoProps> = (props) => {
  const classes = useStyles(props);
  const { className } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <Typography className={classes.logoText} variant="h4" component="span">
        <img src="https://sneakqik.com/sqwhite300.gif" alt="SneakQIK" style={{ width: "150px" }} />
      </Typography>
    </div>
  );
};

export default SneakQIKLogo;
