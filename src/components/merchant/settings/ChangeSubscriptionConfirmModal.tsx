import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import { GradientButton } from "components/Buttons";

import SubscriptionConfirm from "./SubscriptionConfirm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 24px 0 36px",
    maxWidth: 1085,
    borderBottom: "1px solid #0000000D",
  },
  dialogLayout: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
      maxWidth: "fit-content",
    },
  },
  dialogButton: {
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  body: {
    display: "flex",
  },
  rightSidebar: {
    width: 278,
  },
  nextBtn: {
    fontWeight: "bold",
    height: 40,
    width: 160,
    marginBottom: 9,
    float: "right",
    marginTop: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 22,
    textAlign: "center",
  },
}));

export default function ChangeSubscriptionPlanModal(props) {
  const classes = useStyles();

  return (
    <Dialog
      scroll="body"
      open={props.open}
      className={classes.dialogLayout}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent classes={{ root: classes.root }} dividers={false}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
        <Typography component="h1" className={classes.title}>
          Confirm change of subscription
        </Typography>
        <SubscriptionConfirm currentPlan={props.currentPlan} selectedPlan={props.selectedPlan} />
      </DialogContent>
      <DialogContent>
        <GradientButton
          variant="contained"
          disableElevation
          color="primary"
          className={classes.nextBtn}
          onClick={props.onConfirm}
          disabled={props.isUpdating}
        >
          Confirm Change
        </GradientButton>
      </DialogContent>
    </Dialog>
  );
}
