import React from "react";

import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import { authActions } from "store/auth/actions";

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
      fontWeight: "bold",
    },
    "&:last-of-type": {
      marginRight: 0,
    },
  },
  login: {
    height: 31,
    width: 82,
    letterSpacing: "1px",

    "&.MuiButton-root": {
      color: "#ffffff",
      outline: "none",
    },
  },
});
const GuestHeader = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(authActions.showUserRegisterForm());
  };

  const handleLogin = () => {
    dispatch(authActions.showUserLoginForm());
  };

  return (
    <ul className={classes.sectionRight}>
      <li className={classes.item}>
        <Hidden only={["xs", "sm"]}>
          <Link href="/?view=trending&type=coupon">
            <Button color="primary">{"Top Coupons"}</Button>
          </Link>
        </Hidden>
      </li>
      <li className={classes.item}>
        <Button color="primary" onClick={handleRegister}>
          Sign up
        </Button>
      </li>

      <li className={classes.item}>
        <GradientButton onClick={handleLogin} variant="contained" color="primary" className={classes.login}>
          Log In
        </GradientButton>
      </li>
    </ul>
  );
};

export default GuestHeader;
