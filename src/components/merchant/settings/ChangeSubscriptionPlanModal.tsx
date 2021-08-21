import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import SubscriptionPlans from "components/merchant/settings/SubscriptionPlans";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 24px 24px 24px",
    maxWidth: 1085,
    borderBottom: "1px solid #0000000D",
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
  const { isHaveCard } = props;

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
          Change subscription plan
        </Typography>

        {!isHaveCard && <Typography className="mb-7">{"You have no card, you have to add a card first"}</Typography>}

        {isHaveCard && <SubscriptionPlans onSubscribe={props.onSubscribe} />}
      </DialogContent>
    </Dialog>
  );
}
