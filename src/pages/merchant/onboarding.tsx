import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination } from "swiper";

import { GradientButton } from "components/Buttons";
import { startSlider } from "data/demo";
import EclipseLayout from "layouts/EclipseLayout";

SwiperCore.use([Pagination]);

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: "100%",
    maxWidth: "790px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "16px",
    paddingRight: "16px",
    flex: 1,
    position: "relative",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "#FFF",
  },

  image: {
    width: "100%",
    minHeight: "240px",
    marginBottom: "23px",

    [theme.breakpoints.up("sm")]: {
      marginBottom: "30px",
    },
  },

  title: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    marginBottom: "18px",

    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
      lineHeight: "37px",
    },
  },

  description: {
    marginBottom: "48px",
  },

  gradientBtn: {
    width: "100%",
    height: "40px",
    maxWidth: "292px",
    marginBottom: "10px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "363px",
    },
  },

  standardBtn: {
    width: "100%",
    height: "40px",
    maxWidth: "292px",
    marginBottom: "10px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "363px",
    },
  },

  bullet: {
    background: "#C4C4C4",
    width: "9px",
    height: "9px",
    display: "inline-block",
    borderRadius: "100%",
    margin: "0 4px",
  },

  bulletActive: {
    background: "#737373",
  },

  navigation: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "12px",
    left: "24px",
    right: "24px",
  },

  prevBtn: {
    width: "101px",
    height: "45px",

    [theme.breakpoints.up("sm")]: {
      width: "155px",
      height: "47px",
    },
  },

  nextBtn: {
    width: "101px",
    height: "45px",

    [theme.breakpoints.up("sm")]: {
      width: "155px",
      height: "47px",
    },
  },
}));

export type SliderType = {
  description: string;
  image: string;
  title: string;
};

const OnBoardingSlide: React.FunctionComponent<SliderType> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <img className={classes.image} src={props.image} />

      <Typography className={classes.title} component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
        {props.title}
      </Typography>

      <Typography
        className={classes.description}
        component="p"
        variant="body2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {props.description}
      </Typography>
    </div>
  );
};

const OnboardingPage: React.FunctionComponent = () => {
  const classes = useStyles();

  const router = useRouter();

  const handleSkip = () => {
    localStorage.setItem("isOnboarding", "no");
    router.push("/merchant/brands/draft");
  };

  const renderStart = () => {
    return (
      <div className={classes.paper}>
        <OnBoardingSlide {...startSlider} />

        <GradientButton
          type="submit"
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          className={classes.gradientBtn}
          onClick={handleSkip}
        >
          Setup up your brand page
        </GradientButton>
      </div>
    );
  };

  return (
    <EclipseLayout>
      <main className={classes.main}>{renderStart()}</main>
    </EclipseLayout>
  );
};

export default OnboardingPage;
