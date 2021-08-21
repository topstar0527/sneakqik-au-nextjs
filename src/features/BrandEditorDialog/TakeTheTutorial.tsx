import React from "react";

import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    marginBottom: "18px",
  },
  list: {
    listStyle: "disc",
    paddingLeft: "20px",
    paddingTop: "10px",
  },
  listItem: {
    paddingBottom: "10px",
  },

  image: {
    width: "100%",
    height: "200px",
    backgroundColor: "#CFCFCF",
    objectFit: "cover",
  },

  footer: {
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      alignItems: "stretch",
      marginTop: "-8px",
    },
  },

  stepper: {
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
      marginTop: "8px",
      marginBottom: "8px",
    },
  },

  comment: {
    paddingLeft: "18px",
    paddingRight: "18px",
    fontSize: 11,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginTop: "8px",
      marginBottom: "8px",
      paddingLeft: "inherit",
      paddingRight: "inherit",
    },
  },

  nextButton: {
    paddingLeft: 26,
    paddingRight: 26,
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

export default function TakeTheTutorial() {
  const classes = useStyles();

  const router = useRouter();

  const draft = useSelector((state: any) => state.merchant.brands.draft.data);

  const handleSubmit = () => {
    router.push(`/merchant/brands/[brandSlug]`, `/merchant/brands/${draft.slug}`);
  };

  return (
    <>
      <Typography variant="h5" className={classes.title} gutterBottom>
        Congratulations! Your brand page is published.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <img className={classes.image} src="/images/image1.jpg" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            NEXT STEPS..
            <ul className={classes.list}>
              <li className={classes.listItem}>Personalise by adding attractive background and images.</li>
              <li className={classes.listItem}>Post exclusive offers for best shopper engagement.</li>
              <li className={classes.listItem}>Post deals and coupons regularly to build followers.</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>

      <hr style={{ margin: "14.5px -24px" }}></hr>

      <div className={classes.footer}>
        <MobileStepper
          className={classes.stepper}
          variant="dots" //
          steps={4}
          position="static"
          activeStep={3}
          backButton={null}
          nextButton={null}
        />

        {/* <Typography className={classes.comment} variant="body2" color="textSecondary">
          {`You can always edit this information in your Settings`}
        </Typography> */}

        <GradientButton
          className={classes.nextButton}
          type="button"
          variant="contained"
          disableElevation
          onClick={handleSubmit}
          color="primary"
        >
          Close
        </GradientButton>
      </div>
    </>
  );
}
