import React from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

import API from "api";
import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import EclipseLayout from "layouts/EclipseLayout";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: "539px",
  },

  title: {
    marginTop: "0px",
    marginBottom: "21px",

    color: "#FFF",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",

    [theme.breakpoints.up("sm")]: {
      marginTop: "12px",
      marginBottom: "40px",

      fontSize: "30px",
      lineHeight: "37px",
    },
  },

  paper: {
    minHeight: "450px",
    width: "100%",
    backgroundColor: "white",
    paddingLeft: "8px",
    paddingRight: "8px",
    textAlign: "center",

    [theme.breakpoints.up("sm")]: {
      paddingLeft: "64px",
      paddingRight: "64px",
    },
  },

  description: {
    marginTop: "24px",
    marginBottom: "24px",
    textAlign: "center",
    lineHeight: "17px",
  },

  nextBtn: {
    width: "100%",
    height: "40px",
    maxWidth: "266px",
    marginBottom: "10px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "363px",
    },
  },

  contactUs: {
    marginTop: "90px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "70px",
    },
  },
}));

const VerifyEmailPage: React.FunctionComponent = () => {
  const classes = useStyles();

  const router = useRouter();

  const { email, token } = router.query;

  const [sending, setSending] = React.useState<boolean>(false);

  const handleResendEmail = async () => {
    setSending(true);
    try {
      await API.auth.sendVerificationEmail(token as string);
    } catch (e) {
      console.error(e);
    }
    setSending(false);
  };

  return (
    <EclipseLayout>
      <Container maxWidth="lg" className={classes.main}>
        <Typography
          className={classes.title}
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Verify it’s your business
        </Typography>

        <Paper className={classes.paper} elevation={0}>
          <Typography className={classes.description} variant="body1" align="center" color="textPrimary" paragraph>
            You’re almost there! We sent an email to
            <br />
            <strong>{email}</strong>
            <br />
            <br />
            Please click on the link in the email to complete your sign up. Until we confirm your email you can&apos;t
            set up your brand page and offers.
            <br />
            <br />
            If you don’t see our email, check your <strong>spam folder</strong>
          </Typography>

          <GradientButton
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            color="primary"
            className={classes.nextBtn}
            disabled={sending}
            onClick={handleResendEmail}
          >
            RESEND EMAIL
          </GradientButton>

          {/* <Button
            fullWidth
            variant="text"
            disableElevation
            color="primary"
            className={classes.nextBtn}
            // onClick={handleEnterEmail}
          >
            ENTER EMAIL AGAIN
          </Button> */}

          <Typography className={classes.contactUs} component="p" variant="body2" align="center">
            Need help?{" "}
            <Link color="initial" href="#">
              Contact us
            </Link>
          </Typography>
        </Paper>
      </Container>
    </EclipseLayout>
  );
};

export default VerifyEmailPage;
