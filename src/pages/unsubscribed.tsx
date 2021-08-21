import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CMSFooter from "components/header/CMSFooter";
import CMSHeader from "components/header/CMSHeader";

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url("/images/shape.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "45%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    textAlign: "center",
    marginTop: 64,
    height: "100%",
  },
  logo: {
    color: "#6E33D4",
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },

  textSection: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

export default function Unsubscribed() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CMSHeader />
      <Container maxWidth="md" className={classes.body}>
        <div className={classes.textSection}>
          <Typography className={classes.logo} variant="h4">
            You have successfully unsubscribed. We will miss you! Please email us at contact@sneakqik.com if you had any
            issues. We would love to help you out.
          </Typography>
        </div>
      </Container>
      <CMSFooter />
    </div>
  );
}
