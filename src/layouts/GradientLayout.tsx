import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Copyright from "components/shared/Copyright";
import SneakQIKLogo from "components/SneakLogo";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(14.92deg, #6E33D4 10.35%, #9162E1 90.88%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    marginTop: "66px",
    minHeight: "86px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      minHeight: "130px",
    },
  },

  footer: {
    minHeight: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      minHeight: "115px",
    },
  },

  copyright: {
    fontSize: "10px",
    lineHeight: "12px",
    color: "#FFFFFF",
    opacity: 0.5,

    [theme.breakpoints.up("sm")]: {
      fontSize: "14px",
      lineHeight: "16px",
    },
  },

  // style SneakQIK logo
  logoIcon: {
    width: "32px",
    height: "21px",
    marginRight: "11px",

    [theme.breakpoints.up("sm")]: {
      width: "42px",
      height: "27px",
    },
  },

  logoText: {
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "31px",
    color: "#FFF",

    [theme.breakpoints.up("sm")]: {
      fontSize: "35px",
      lineHeight: "36px",
    },
  },
}));

const GradientLayout: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <SneakQIKLogo classes={{ logoText: classes.logoText, logoIcon: classes.logoIcon }} />
      </header>

      {props.children}

      <footer className={classes.footer}>
        <Copyright className={classes.copyright} />
      </footer>
    </div>
  );
};

export default GradientLayout;
