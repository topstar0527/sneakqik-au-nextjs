import React, { useState } from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import moment from "moment";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import CustomInputLabel from "components/core/CustomInputLabel";
import Link from "components/core/Link";
import SettingsLayout from "layouts/SettingsLayout";
import actions from "store/merchant/subscription/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  box: {
    padding: 11.5,
  },
  pageTitleBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,

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
  backWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backIcon: {
    color: "#6E33D4",
    fontSize: 16,
  },
  backText: {
    color: "#6E33D4",
    fontSize: 14,
  },
  detailsWrapper: {
    backgroundColor: "white",
    padding: 20,
  },
  infoTitleLabel: {
    marginBottom: 5,
  },
  infoDivider: {
    marginBottom: 20,
  },
  listWrapper: {
    marginTop: 20,
  },
  listHeaderLabel: {
    fontWeight: "bold",
    textAlign: "center",
  },
  listHeaderPriceLabel: {
    fontWeight: "bold",
    textAlign: "right",
  },
  listItemLabel: {
    textAlign: "center",
  },
  listItemPriceLabel: {
    textAlign: "right",
  },
  downloadLabel: {
    textAlign: "center",
    color: "#6E33D4",
  },

  cancelled: {
    color: "red",
    textTransform: "uppercase",
    border: "1px solid red",
    borderRadius: "16px",
    padding: "3px 12px",
    fontWeight: "normal",
  },
}));

//const chargebeeSite = process.env.NEXT_PUBLIC_CHARGEBEE_SITE;

export default function BillingDetails() {
  const classes = useStyles();
  const user = useSelector((state: any) => state.auth.user);
  const invoices = useSelector((state: any) => state.merchant.subscription.invoices);
  const [price, setPrice] = useState(0);

  const planDetailData = {
    basic: "Basic for Free",
    "premium-monthly": "Premium for " + "$$/month",
    "premium-yearly": "Premium for " + "$$/year",
    "multi-monthly": "Multi for " + "$$/month",
    "multi-yearly": "Multi for " + "$$/year",
  };

  const planChargeData = {
    basic: "",
    "premium-monthly": "(charge monthly)",
    "premium-yearly": "(charge yearly)",
    "multi-monthly": "(charge monthly)",
    "multi-yearly": "(charge yearly)",
  };

  const nextBillingAt = user.chargebee?.subscription?.nextBillingAt;
  const m2 = moment(nextBillingAt * 1000);
  const nextBillingAtFormatted = `${m2.format("D")} ${m2.format("MMMM")} ${m2.format("YYYY")}`;

  const planDetail = planDetailData[user.chargebee?.plan.id];
  const planCharge = planChargeData[user.chargebee?.plan.id];

  const status = user.chargebee?.subscription?.status;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const plan = user.chargebee?.plan;
    const subscription = user.chargebee?.subscription;
    if (plan.price) {
      setPrice(plan.price);
    } else if (plan.metaData.tiers) {
      plan.metaData.tiers.forEach((tier) => {
        if (tier.quantity == subscription.planQuantity) setPrice(tier.price);
      });
    }

    dispatch(actions.getInvoicesRequest());
  }, []);

  return (
    <>
      <SettingsLayout>
        <Head>
          <title>Settings - Billing details</title>
        </Head>
        <div className={classes.root}>
          <Link className={classes.backWrapper} href="/merchant/settings/subscription">
            <ArrowBackIosIcon className={classes.backIcon} />
            <Typography className={classes.backText}>Back</Typography>
          </Link>
          <div className={classes.pageTitleBox}>
            <Typography className="pageTitle">Billing details</Typography>
          </div>
          <div className={classes.detailsWrapper}>
            <CustomInputLabel className={classes.infoTitleLabel}>
              Your plan&nbsp;
              {status === "cancelled" && <span className={classes.cancelled}>Cancelled</span>}
            </CustomInputLabel>
            <Typography>{planDetail.replace("$$", "$" + price / 100)}</Typography>
            <Typography className={classes.infoDivider}>{planCharge}</Typography>
            {status !== "cancelled" && (
              <>
                <CustomInputLabel className={classes.infoTitleLabel}>Your next bill</CustomInputLabel>
                <Typography>{nextBillingAtFormatted}</Typography>
              </>
            )}
          </div>
          <div className={classes.listWrapper}>
            <Grid container spacing={3} className={classes.box} alignItems="center">
              <Hidden xsDown>
                <Grid item sm={3}>
                  <Typography className={classes.listHeaderLabel}>Date</Typography>
                </Grid>
              </Hidden>
              <Grid item sm={3}>
                <Typography className={classes.listHeaderLabel}>Service period</Typography>
              </Grid>
              {/* <Hidden xsDown>
                <Grid item sm={3}>
                  <Typography className={classes.listHeaderLabel}>Payment method</Typography>
                </Grid>
              </Hidden> */}
              <Hidden xsDown>
                <Grid item sm={3}>
                  <Typography className={classes.listHeaderPriceLabel}>Total</Typography>
                </Grid>
              </Hidden>
              <Grid item sm={3}>
                <Typography className={classes.listHeaderLabel}>Action</Typography>
              </Grid>
            </Grid>
            <Divider />
            {invoices.slice(0, 10).map((iv) => {
              const invoice = iv.invoice;
              const invoiceDate = moment(invoice.date * 1000);

              const billingPeriodFrom = moment(invoice.lineItems[0].dateFrom * 1000);
              const billingPeriodTo = moment(invoice.lineItems[0].dateTo * 1000);
              return (
                <>
                  <Grid container spacing={3} className={classes.box} alignItems="center">
                    <Hidden xsDown>
                      <Grid item sm={3}>
                        <Typography className={classes.listItemLabel}>{invoiceDate.format("M/D/YY")}</Typography>
                      </Grid>
                    </Hidden>
                    <Grid item sm={3}>
                      <Typography className={classes.listItemLabel}>
                        {billingPeriodFrom.format("M/D/YY") + "-" + billingPeriodTo.format("M/D/YY")}
                      </Typography>
                    </Grid>
                    {/* <Hidden xsDown>
                    <Grid item sm={3}>
                      <Typography className={classes.listItemLabel}>xxxx-xxxx-xxxx-xxxx</Typography>
                    </Grid>
                  </Hidden> */}
                    <Hidden xsDown>
                      <Grid item sm={3}>
                        <Typography className={classes.listItemPriceLabel}>${invoice.total / 100}</Typography>
                      </Grid>
                    </Hidden>
                    <Grid item sm={3}>
                      <Link href={`${process.env.NEXT_PUBLIC_API_URL}/api/chargebee/invoices/${invoice.id}/download/`}>
                        <Typography className={classes.downloadLabel}>Download invoice</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                  <Divider />
                </>
              );
            })}
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}
