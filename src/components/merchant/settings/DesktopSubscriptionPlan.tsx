import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { GradientButton } from "components/Buttons";

const useStyles = makeStyles({
  submitWrapper: {
    width: "100%",
    marginTop: "auto",
    paddingTop: 10,
  },

  // style plan
  planWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
  },

  planContainer: {
    width: "100%",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "3px",
    padding: "13px 9px 28px 9px",
  },

  planHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "23px",
    color: "#4A4A4A",
    marginBottom: "6px",
  },

  planPrice: {
    textAlign: "center",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: "11px",
  },

  planPriceLeft: {
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "35px",
    color: "#804BDB",
    marginRight: "6px",
  },

  planPriceRight: {
    fontSize: "15px",
    lineHeight: "18px",
    color: "#4A4A4A",
  },

  planBenefits: {
    display: "flex",
    flexDirection: "column",
  },

  planBenefit: {
    padding: "8px 14px 8px 14px",
    color: "#4A4A4A",
  },

  planEven: {
    background: "rgba(196, 196, 196, 0.5)",
  },

  planExplain: {
    color: "#4a4a4a",
    fontSize: "10px",
    position: "absolute",
    bottom: "6px",
    left: "94px",
  },
  selectStore: {
    textAlign: "left",
    paddingRight: 15,

    "& .MuiTypography-root": {
      paddingRight: 6,
    },

    "& .MuiSelect-root": {
      padding: 7,
      width: 116,
    },
  },
});

type DesktopSubscriptionPlanProps = {
  current?: boolean;
  disableMulti: boolean;
  onSubscribe?: (value: any) => void;
  plan: any;
  planQuantity: number;
  subscribe?: boolean;
};

const DesktopSubscriptionPlan: React.FunctionComponent<DesktopSubscriptionPlanProps> = (props) => {
  const classes = useStyles();
  const { current, disableMulti, plan, planQuantity, subscribe } = props;
  const [storeValue, setStoreValue] = React.useState(planQuantity);
  const tiers = plan.multi ? plan.metaData.tiers : null;
  const [price, setPrice] = React.useState(plan.price);

  React.useEffect(() => {
    setPriceForMulti();
  }, [storeValue]);

  const setPriceForMulti = () => {
    if (plan.multi && tiers) {
      tiers.forEach((tier) => {
        if (tier.quantity == storeValue) {
          setPrice(tier.price);
        }
      });
    }
  };

  const handleMultiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStoreValue(event.target.value as number);
  };

  const handleSubscribe = () => {
    if (plan.multi) {
      plan.planQuantity = storeValue;
    } else {
      plan.planQuantity = "none";
    }
    props.onSubscribe && props.onSubscribe(plan);
  };

  return (
    <div className={classes.planWrapper}>
      <div
        className={classes.planContainer}
        style={current ? { border: "2px solid #804BDB" } : { border: "1px solid rgba(0, 0, 0, 0.2)" }}
      >
        <Typography className={classes.planHeader} variant="h6" component="h6">
          {plan.label}
        </Typography>

        <div className={classes.planPrice}>
          {plan.multi && (
            <FormControl variant="outlined" className={classes.selectStore}>
              <InputLabel id="demo-simple-select-outlined-label" />
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={storeValue}
                onChange={handleMultiChange}
                disabled={disableMulti}
              >
                {tiers.map((tier) => (
                  <MenuItem key={tier.quantity} value={tier.quantity}>
                    {tier.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Typography className={classes.planPriceLeft} variant="h5" component="h5">
            {price === 0 ? "FREE" : `$${price / 100}`}
          </Typography>
        </div>

        <div className={classes.planBenefits}>
          {plan.metaData.benefits.map((benefit, index) => (
            <Typography
              key={index}
              variant="body2"
              component="p"
              className={clsx(classes.planBenefit, index % 2 && classes.planEven)}
            >
              {benefit}
            </Typography>
          ))}
        </div>
        <div className={classes.submitWrapper}>
          {subscribe && (
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              onClick={handleSubscribe}
              disabled={current}
            >
              Subscribe
            </GradientButton>
          )}
        </div>
        <Typography className={classes.planExplain}>{plan.description}</Typography>
      </div>
    </div>
  );
};

export default DesktopSubscriptionPlan;
