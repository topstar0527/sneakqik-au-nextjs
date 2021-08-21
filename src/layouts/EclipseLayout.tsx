import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Copyright from "components/shared/Copyright";
import SneakLogo from "components/SneakLogo";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      minHeight: "96px",
    },
  },

  footer: {
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      minHeight: "106px",
    },
  },

  logo: {
    position: "absolute",
    left: "24px",
    top: "20px",

    [theme.breakpoints.up("sm")]: {
      left: "54px",
      top: "45px",
    },
  },

  back: {
    position: "absolute",
    zIndex: -1,
    background: "linear-gradient(86.26deg, #763ED7 22.35%, #9669E3 72.1%)",
    width: "132vw",
    height: "75vw",
    borderRadius: "50% 50%",
    transform: "translate(calc(50vw - 50%), -20%)",

    [theme.breakpoints.up("sm")]: {
      height: "64vw",
      transform: "translate(calc(50vw - 50%), -25%)",
    },

    [theme.breakpoints.up("md")]: {
      height: "64vw",
      transform: "translate(calc(50vw - 50%), -45%)",
    },

    [theme.breakpoints.up("lg")]: {
      height: "64vw",
      transform: "translate(calc(50vw - 50%), -55%)",
    },
  },

  copyright: {
    color: "#000",
    opacity: 0.5,
  },
}));

const EclipseLayout: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.back}></div>

      <header className={classes.header}>
        <SneakLogo className={classes.logo} />
      </header>

      {props.children}

      <footer className={classes.footer}>
        <Copyright className={classes.copyright} />
      </footer>
    </div>
  );
};

export default EclipseLayout;
