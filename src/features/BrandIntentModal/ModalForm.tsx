import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

import { GradientButton } from "components/Buttons";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    marginTop: theme.spacing(3),
    padding: 5,
    marginBottom: theme.spacing(3),
  },
  offersAvatar: {
    width: 65,
    height: 65,
    marginTop: "30px",
    marginBottom: "30px",
  },
  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
    lineHeight: "21px",
    whiteSpace: "pre-line",
    textAlign: "center",
  },
}));

export default function BrandIntentForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(authActions.showUserRegisterForm());
  };

  return (
    <div className={classes.paper}>
      <Grid>
        <Avatar variant="square" alt="Logo" src={"/images/favicon_logo.png"} className={classes.offersAvatar} />
      </Grid>
      <Typography component="h1" variant="h5" className={classes.formTitle}>
        Shh, Sneak a Quick Deal!
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p className={classes.content}>
            SneakQIK is a social platform, where you can follow and track all your favorite brands for their secret
            coupons and exclusive offers in your newsfeed.
          </p>
        </Grid>

        <Grid item xs={12}>
          <GradientButton
            onClick={handleRegister}
            fullWidth
            variant="contained"
            disableElevation
            size="large"
            color="primary"
            className={classes.divider}
          >
            QIK Sign Up
          </GradientButton>
        </Grid>
      </Grid>
    </div>
  );
}
