import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination } from "swiper";

import DesktopSubscriptionPlan from "./DesktopSubscriptionPlan";

SwiperCore.use([Pagination]);

const useStyles = makeStyles(() => ({
  main: {
    flex: 1,
    display: "flex",
  },
  paper: {
    width: "100%",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    position: "relative",
    marginTop: "-6px",
  },
  subscriptionWrapper: {
    width: "100%",
    // maxWidth: "300px",
    // minHeight: "320px",
    background: "white",

    "& .swiper-container-horizontal > .swiper-pagination-bullets": {
      bottom: 16,
    },
  },
  // style slider
  slider: {
    width: "100%",
    height: "auto",
    minHeight: "340px",
    display: "flex",
    justifyContent: "space-evenly",
  },
  slide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 326,
    height: "auto",
    position: "relative",
    marginRight: 12,

    "&:last-child": {
      marginRight: 0,
    },
  },
  // style slider
  mslider: {
    width: "100%",
    height: "auto",
    minHeight: "340px",
  },

  mslide: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: 326,
    height: "auto",
    position: "relative",
    marginBottom: 12,

    "&:last-child": {
      marginRight: 0,
    },
  },

  planHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "23px",
    color: "#4A4A4A",
    paddingTop: "20px",
    paddingBottom: "15px",
  },
  headerWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

type SubscriptionConfirmProps = {
  currentPlan: any;
  selectedPlan: any;
};

const SubscriptionConfirm: React.FunctionComponent<SubscriptionConfirmProps> = (props) => {
  const classes = useStyles();
  let { currentPlan, selectedPlan } = props;
  const user = useSelector((state: any) => state.auth.user);

  const planAdditionalData = {
    basic: { label: "Basic", description: "" },
    "premium-monthly": { label: "Premium", description: "Bill Monthly. Cancel anytimes", multi: false },
    "premium-yearly": { label: "Premium", description: "Bill Yearly. Cancel anytimes", multi: false },
    "multi-monthly": { label: "Multi", description: "Bill Monthly. Cancel anytimes", multi: true },
    "multi-yearly": { label: "Multi", description: "Bill Yearly. Cancel anytimes", multi: true },
  };

  currentPlan = { ...currentPlan, ...planAdditionalData[currentPlan.id] };
  selectedPlan = { ...selectedPlan, multi: false, ...planAdditionalData[selectedPlan.id] };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main className={classes.main}>
      <div className={classes.paper}>
        <div className={classes.root}>
          <div className={classes.subscriptionWrapper}>
            <ul id="subscription" className={matches ? classes.slider : classes.mslider}>
              <li key="current" className={matches ? classes.slide : classes.mslide}>
                <h1 className={classes.planHeader}>CURRENT PLAN</h1>
                <DesktopSubscriptionPlan
                  plan={currentPlan}
                  planQuantity={user.chargebee?.subscription.planQuantity}
                  disableMulti={true}
                />
              </li>
              <li key="selected" className={matches ? classes.slide : classes.mslide}>
                <h1 className={classes.planHeader}>NEW PLAN</h1>
                <DesktopSubscriptionPlan
                  plan={selectedPlan}
                  planQuantity={selectedPlan.planQuantity}
                  disableMulti={true}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubscriptionConfirm;
