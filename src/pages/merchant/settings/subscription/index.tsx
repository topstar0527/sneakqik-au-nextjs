import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import moment from "moment";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import base from "api/base";
import { GradientButton } from "components/Buttons";
import CustomInputLabel from "components/core/CustomInputLabel";
import Link from "components/core/Link";
import CancelSubscriptionModal from "components/merchant/settings/CancelSubscriptionModal";
import ChangeSubscriptionConfirmModal from "components/merchant/settings/ChangeSubscriptionConfirmModal";
import ChangeSubscriptionPlanModal from "components/merchant/settings/ChangeSubscriptionPlanModal";
import ReactivateSubscriptionModal from "components/merchant/settings/ReactivateSubscriptionModal";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";
import actions from "store/merchant/subscription/actions";
import { showMessage } from "store/message/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  box: {
    padding: 11.5,
    "& .contentGrid": {
      display: "flex",
      [theme.breakpoints.down("sm")]: { paddingTop: 0 },
      [theme.breakpoints.up("sm")]: { paddingLeft: 0, paddingRight: 0 },
    },
  },
  pageTitleBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 16,

    "& .pageTitle": {
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 12,
    },

    "& .joinedDate": {
      color: "#6E33D4",
      textTransform: "uppercase",
      border: "1px solid #6E33D4",
      borderRadius: "16px",
      padding: "3px 12px",
    },
  },
  cancelledLabel: {
    color: "#6E33D4",
    textTransform: "uppercase",
    border: "1px solid #6E33D4",
    borderRadius: "16px",
    padding: "3px 12px",
    marginLeft: 10,
  },
  label: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 5,
  },
  changePlanBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 159,
  },
  reactivateSubscriptionBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 200,
  },
  textButton: {
    textTransform: "inherit",
    color: "#6E33D4",
  },
  cancelled: {
    color: "red",
    textTransform: "uppercase",
    border: "1px solid red",
    borderRadius: "16px",
    padding: "3px 12px",
  },
}));

const planDetailData = {
  basic: { name: "Basic", description: "" },
  "premium-monthly": { name: "Premium", description: "(Charge Monthly)" },
  "premium-yearly": { name: "Premium", description: "(Charge Yearly)" },
  "multi-monthly": { name: "Multi", description: "(Charge Monthly)" },
  "multi-yearly": { name: "Multi", description: "(Charge Yearly)" },
};

export default function Subscription() {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useSelector((state: any) => state.auth.user);
  const plans = useSelector((state: any) => state.merchant.subscription.plans);
  const dispatch = useDispatch();

  const chargebee = useSelector((state: any) => state.merchant.subscription.chargebee);
  const isUpdating = useSelector((state: any) => state.merchant.subscription.isUpdating);

  React.useEffect(() => {
    if (!plans) {
      dispatch(actions.getPlansRequest());
    }
  }, []);

  React.useEffect(() => {
    if (confirmDialogOpen && !isUpdating) {
      setConfirmDialogOpen(false);
    }

    if (cancelDialogOpen && !isUpdating) {
      setCancelDialogOpen(false);
    }

    if (reactivateDialogOpen && !isUpdating) {
      setReactivateDialogOpen(false);
    }

    if (chargebee != null) {
      dispatch(authActions.updateChargebeePlan(chargebee));
    }
  }, [isUpdating, chargebee]);

  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(user.chargebee?.plan);
  const [reactivateDialogOpen, setReactivateDialogOpen] = useState(false);

  const joinedAt = user.chargebee?.subscription?.createdAt;

  const planId = user.chargebee?.plan.id;
  const planDetail = planDetailData[planId];

  const nextBillingAt = user.chargebee?.subscription?.nextBillingAt;
  const cardType = user.chargebee?.card?.cardType;
  const maskedNumber = user.chargebee?.card?.maskedNumber;
  const cardName = cardType?.charAt(0).toUpperCase() + cardType?.slice(1);
  const billingAccount = maskedNumber === undefined ? "" : `${cardName} ${maskedNumber}`;

  const m1 = moment(joinedAt * 1000);
  const joinedAtFormatted = `Joined Since ${m1.format("MMMM")} ${m1.format("YYYY")}`;

  const m2 = moment(nextBillingAt * 1000);
  const nextBillingAtFormatted = `${m2.format("D")} ${m2.format("MMMM")} ${m2.format("YYYY")}`;

  const status = user.chargebee?.subscription?.status;

  const handlePlanDialog = () => {
    if (plans) {
      setPlanDialogOpen(true);
    }
  };

  const handleClosePlanDialog = () => {
    setPlanDialogOpen(false);
  };

  const handleCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  const handleCancelSubscription = () => {
    dispatch(actions.cancelSubscriptionRequest());
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setPlanDialogOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    if (selectedPlan.planQuantity == "none") {
      dispatch(
        actions.updateSubscriptionRequest({
          planId: selectedPlan.id,
        })
      );
    } else {
      dispatch(
        actions.updateSubscriptionRequest({
          planId: selectedPlan.id,
          planQuantity: selectedPlan.planQuantity,
        })
      );
    }
  };

  const handleUpdatePaymentInfo = (event: React.MouseEvent) => {
    event.preventDefault();

    const cbInstance = window.Chargebee.init({ site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE });

    const paymentSourceChangeCallback = async () => {
      try {
        const { data } = await base.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chargebee/update_chargebee_data/`);
        dispatch(authActions.updateChargebeePlan(data.chargebee));
      } catch (e) {
        dispatch(showMessage({ message: e.message, variant: "error" }));
      }
    };

    cbInstance.openCheckout({
      hostedPage: async () => {
        try {
          const { data } = await base.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chargebee/manage_payment_sources/`);
          return data;
        } catch (e) {
          dispatch(showMessage({ message: e.message, variant: "error" }));
        }
      },
      paymentSourceAdd: paymentSourceChangeCallback,
      paymentSourceUpdate: paymentSourceChangeCallback,
      paymentSourceRemove: paymentSourceChangeCallback,
      close: paymentSourceChangeCallback,
    });
  };

  const handleReactivateDialogClose = () => {
    setReactivateDialogOpen(false);
  };

  const handleReactivateDialogOpen = () => {
    setReactivateDialogOpen(true);
  };

  const handleReactivate = () => {
    dispatch(actions.reactivateSubscriptionRequest());
  };

  return (
    <>
      <SettingsLayout>
        <Head>
          <title>Settings - Subscription</title>
          <script
            src="https://js.chargebee.com/v2/chargebee.js"
            data-cb-site={process.env.NEXT_PUBLIC_CHARGEBEE_SITE}
          ></script>
        </Head>

        <div className={classes.root}>
          <div className={classes.pageTitleBox}>
            <Typography className="pageTitle">Subscription</Typography>
            {user.chargebee && <Typography className="joinedDate">{joinedAtFormatted}</Typography>}
          </div>
          {!user.chargebee && <Typography>No subscription data</Typography>}
          {user.chargebee && (
            <>
              <Grid container spacing={6} className={classes.box} alignItems="center">
                <Grid item sm={7}>
                  <Grid container item>
                    <Grid item sm={4} xs={12} className={classes.label}>
                      <CustomInputLabel>Plan details</CustomInputLabel>
                    </Grid>
                    <Grid item sm={8} style={{ display: "flex", alignItems: "center" }}>
                      <Typography>
                        {planDetail.name}&nbsp;<span>{planDetail.description}</span>
                      </Typography>
                      {(status === "cancelled" || status === "in_trial") && (
                        <Typography className={classes.cancelledLabel}>
                          {status === "cancelled" ? "Cancelled" : "In Trial"}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={5} className="contentGrid">
                  <>
                    {status !== "cancelled" && status !== "non_renewing" ? (
                      <GradientButton
                        variant="contained" //
                        disableElevation
                        color="primary"
                        className={classes.changePlanBtn}
                        onClick={handlePlanDialog}
                      >
                        Change Plan
                      </GradientButton>
                    ) : (
                      <GradientButton
                        variant="contained" //
                        disableElevation
                        color="primary"
                        className={classes.reactivateSubscriptionBtn}
                        onClick={handleReactivateDialogOpen}
                      >
                        Reactivate Subscription
                      </GradientButton>
                    )}
                    {status !== "cancelled" && status !== "non_renewing" && (
                      <Button color="primary" onClick={handleCancelDialog} style={{ marginLeft: 10 }}>
                        Cancel subscription
                      </Button>
                    )}
                  </>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={6} className={classes.box} alignItems="center">
                <Grid item sm={7} xs={6}>
                  <Grid container item>
                    <Grid item sm={4} xs={12} className={classes.label}>
                      <CustomInputLabel>Next billing date</CustomInputLabel>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <Typography>{nextBillingAt ? nextBillingAtFormatted : "No Renewal"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={isSmall && 6} sm={5} className={isSmall ? "" : "contentGrid"} style={{ padding: 0 }}>
                  <Button color="primary" onClick={handleUpdatePaymentInfo} style={{ padding: 0 }}>
                    Update payment info
                  </Button>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={6} className={classes.box} alignItems="center">
                <Grid item sm={7} xs={6}>
                  <Grid container item>
                    <Grid item sm={4} xs={12} className={classes.label}>
                      <CustomInputLabel>Billing account</CustomInputLabel>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <Typography>{billingAccount !== "" ? billingAccount : "No card"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={isSmall && 6} sm={5} className={isSmall ? "" : "contentGrid"} style={{ padding: 0 }}>
                  <Button component={Link} href="/merchant/settings/subscription/billing-details" color="primary">
                    Billing details
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </SettingsLayout>

      <ChangeSubscriptionPlanModal
        open={planDialogOpen}
        onClose={handleClosePlanDialog}
        onSubscribe={handleSubscribe}
        isHaveCard={billingAccount !== ""}
      />

      <CancelSubscriptionModal
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onCancel={handleCancelSubscription}
        nextBillingAt={nextBillingAtFormatted}
        isCancelling={isUpdating}
      />

      <ChangeSubscriptionConfirmModal
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        selectedPlan={selectedPlan}
        currentPlan={user.chargebee?.plan}
        onConfirm={handleConfirm}
        isUpdating={isUpdating}
      />

      <ReactivateSubscriptionModal
        open={reactivateDialogOpen}
        onClose={handleReactivateDialogClose}
        onReactivate={handleReactivate}
        planId={planId}
        isHaveCard={billingAccount !== ""}
        isReactivating={isUpdating}
      />
    </>
  );
}
