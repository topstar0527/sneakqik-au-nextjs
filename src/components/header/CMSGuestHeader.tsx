import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Link from "components/core/Link";

const useStyles = makeStyles({
  sectionRight: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    marginRight: "12px",
    "& button": {
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
      color: "#6E33D4",
      outline: "none",
    },
  },
  login: {
    height: 31,
    width: 82,
    letterSpacing: "1px",

    "&.MuiButton-root": {
      color: "#ffffff",
      fontSize: 12,
      outline: "none",
    },
  },
});
const CMSGuestHeader = () => {
  const classes = useStyles();

  return (
    <ul className={classes.sectionRight}>
      <li className={classes.item}>
        <Button component={Link} href="/" color="primary">
          Back to SneakQIK
        </Button>
      </li>
    </ul>
  );
};

export default CMSGuestHeader;
