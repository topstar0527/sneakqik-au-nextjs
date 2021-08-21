import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { GradientButton } from "components/Buttons";
import StyledTab from "components/core/StyledTab";
import StyledTabs from "components/core/StyledTabs";
import { yearlyPlans, monthlyPlans } from "data/demo";
import { Plan } from "types";

SwiperCore.use([Pagination]);

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "32px",
    position: "relative",
  },

  tabs: {
    marginBottom: "17px",
  },

  cardWrapper: {
    width: "100%",
    height: "90%",
    background: "skyblue",
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

  submit: {},

  // style slider
  slider: {
    width: "100%",
    height: "auto",
    minHeight: "340px",
  },

  slide: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    height: "auto",
  },

  // slideActive: {
  //   height: "100%",
  // },

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

  submitWrapper: {
    width: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
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
    padding: "13px 9px 13px 9px",
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
});

type MobilePlanFormProps = {
  onChange: (value: number) => void;
  onSubmit: (plan: Plan) => void;
  value: number;
};

const MobilePlanForm: React.FunctionComponent<MobilePlanFormProps> = (props) => {
  const classes = useStyles();

  // const [storeValue, setStoreValue] = React.useState("2_4stores");

  // const handleMultiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setStoreValue(event.target.value as string);
  // };

  const handleChange = (_e: React.ChangeEvent<{}>, value: number) => {
    props.onChange(value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    props.onSubmit(plans[swiper?.activeIndex || 0]);
  };

  const plans = props.value === 1 ? yearlyPlans : monthlyPlans;

  const [swiper, setSwiper] = React.useState<SwiperCore | null>(null);

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <StyledTabs value={props.value} onChange={handleChange} aria-label="choose plan tabs">
          <StyledTab label="MONTHLY" />
          <StyledTab label="YEARLY" />
        </StyledTabs>
      </div>

      <div className={classes.subscriptionWrapper}>
        <Swiper
          id="subscription"
          tag="section"
          wrapperTag="ul"
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={10}
          className={classes.slider}
          initialSlide={1}
          // slideActiveClass={classes.slideActive}
          pagination={{
            bulletClass: classes.bullet,
            bulletActiveClass: classes.bulletActive,
          }}
          onSwiper={(s) => {
            setSwiper(s);
          }}
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.label} tag="li" className={classes.slide}>
              <div className={classes.planWrapper}>
                <div className={classes.planContainer}>
                  <Typography className={classes.planHeader} variant="h6" component="h6">
                    {plan.label}
                  </Typography>

                  <div className={classes.planPrice}>
                    <Typography className={classes.planPriceLeft} variant="h5" component="h5">
                      {plan.price === 0 ? "FREE" : `$${plan.price}`}
                    </Typography>
                    {plan.price !== 0 && (
                      <Typography className={classes.planPriceRight} variant="body1" component="span">
                        {"1 month free trial"}
                      </Typography>
                    )}
                  </div>

                  <div className={classes.planBenefits}>
                    {plan.benefits.map((benefit, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        component="p"
                        className={clsx(classes.planBenefit, (index + 1) % 2 && classes.planEven)}
                      >
                        {benefit}
                      </Typography>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={classes.submitWrapper}>
        <GradientButton
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Choose
        </GradientButton>
      </div>
    </div>
  );
};

export default MobilePlanForm;
