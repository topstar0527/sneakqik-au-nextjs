import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import { GradientButton } from "components/Buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 36px 26px",
    maxWidth: 418,
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
  description: {
    marginBottom: 27,
  },
  cancelBtn: {
    color: "#6E33D4",
    fontWeight: "bold",
  },
}));

export default function DeactivateModal(props) {
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
          Deactivate your account?
        </Typography>
        <Typography className={classes.description}>
          Are you sure you want to deactivate your account? We will store your data for 14 working days.
        </Typography>
        <GradientButton
          fullWidth
          variant="contained"
          disableElevation
          color="primary"
          className={classes.deactivateBtn}
          onClick={props.onDelete}
        >
          Deactivate
        </GradientButton>
        <Button className={classes.cancelBtn} onClick={props.onClose} fullWidth>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
