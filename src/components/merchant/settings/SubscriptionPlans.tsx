import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";

import StyledTab from "components/core/StyledTab";
import StyledTabs from "components/core/StyledTabs";

import DesktopSubscriptionPlan from "./DesktopSubscriptionPlan";

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

  title: {
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: "31px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: "-6px",
  },
  tabs: {
    marginBottom: "17px",
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
    height: "auto",
    position: "relative",
    marginBottom: 12,

    "&:last-child": {
      marginRight: 0,
    },
  },
  submitWrapper: {
    width: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
}));

type SubscriptionPlansProps = {
  onSubscribe: (value: any) => void;
};

const SubscriptionPlans: React.FunctionComponent<SubscriptionPlansProps> = (props) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [plans, setPlans] = useState([] as any);
  const user = useSelector((state: any) => state.auth.user);
  const allplans = useSelector((state: any) => state.merchant.subscription.plans);

  const yearlyPlans = [] as any;
  const monthlyPlans = [] as any;

  const handleChange = (_e: React.ChangeEvent<{}>, value: number) => {
    setTabIndex(value);
  };

  yearlyPlans.push({ ...allplans.basic, label: "Basic", multi: false, description: "" });
  yearlyPlans.push({
    ...allplans.premiumYearly,
    label: "Premium",
    multi: false,
    description: "Bill Annually. Cancel anytimes.",
  });
  yearlyPlans.push({
    ...allplans.multiYearly,
    label: "Multi",
    multi: true,
    description: "Bill Annually Cancel anytimes.",
  });
  monthlyPlans.push({ ...allplans.basic, label: "Basic", multi: false, description: "" });
  monthlyPlans.push({
    ...allplans.premiumMonthly,
    label: "Premium",
    multi: false,
    description: "Bill Monthly. Cancel anytimes.",
  });
  monthlyPlans.push({
    ...allplans.multiMonthly,
    label: "Multi",
    multi: true,
    description: "Bill Monthly. Cancel anytimes.",
  });

  const initPlans = () => {
    if (user.chargebee?.plan.periodUnit == "year") {
      setTabIndex(0);
    } else {
      setTabIndex(1);
    }
  };

  React.useEffect(() => {
    initPlans();
  }, []);

  React.useEffect(() => {
    setPlans(tabIndex == 0 ? yearlyPlans : monthlyPlans);
  }, [tabIndex]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main className={classes.main}>
      <div className={classes.paper}>
        <div className={classes.root}>
          <div className={classes.tabs}>
            <StyledTabs value={tabIndex} onChange={handleChange} aria-label="choose plan tabs">
              <StyledTab label="YEARLY" />
              <StyledTab label="MONTHLY" />
            </StyledTabs>
          </div>

          <div className={classes.subscriptionWrapper}>
            <ul id="subscription" className={matches ? classes.slider : classes.mslider}>
              {plans.map((plan) => (
                <li key={plan.id} className={matches ? classes.slide : classes.mslide}>
                  <DesktopSubscriptionPlan
                    onSubscribe={props.onSubscribe}
                    plan={plan}
                    current={plan.id == user.chargebee?.plan.id}
                    subscribe={true}
                    planQuantity={
                      plan.multi && plan.id == user.chargebee?.plan.id ? user.chargebee?.subscription.planQuantity : 1
                    }
                    disableMulti={false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubscriptionPlans;
