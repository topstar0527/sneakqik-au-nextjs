import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 36px 26px",
  },
  dialogLayout: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
      maxWidth: "100%",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  deactivateBtn: {
    fontWeight: "bold",
    height: 40,
    marginBottom: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 22,
    textAlign: "center",
  },
}));

export default function ReactivateSubscriptionModal(props) {
  const classes = useStyles();
  const { isHaveCard, isReactivating, onReactivate, planId } = props;

  const plans = useSelector((state: any) => state.merchant.subscription.plans) || {};

  const plan = Object.values(plans).find((p: any) => p.id === planId);

  return (
    <Dialog
      scroll="body" //
      open={props.open}
      className={classes.dialogLayout}
      onClose={props.onClose}
    >
      <DialogContent classes={{ root: classes.root }} dividers={false}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
        <Typography component="h1" className={classes.title}>
          Reactivate Subscription
        </Typography>

        {!isHaveCard && <Typography className="mb-7">{"You have no card, you have to add a card first"}</Typography>}

        {isHaveCard && (
          <>
            <Typography className="mb-1">
              Reactive your subscription to reactivate the premium features of SneakQIK:
            </Typography>
            {(plan as any)?.metaData.benefits.map((benefit) => (
              <Typography key={benefit}>{`• ${benefit}`}</Typography>
            ))}
            <br />
          </>
        )}

        {isHaveCard && (
          <GradientButton
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
            disabled={isReactivating}
            className={classes.deactivateBtn}
            onClick={onReactivate}
          >
            {"Reactivate now"}
          </GradientButton>
        )}
      </DialogContent>
    </Dialog>
  );
}
