import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import API from "api";
import CustomInputLabel from "components/core/CustomInputLabel";
import DeactivateModal from "components/settings/DeactivateModal";
import { authActions } from "store/actions";
import { showMessage } from "store/message/actions";

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    background: "#ECECEC",
    borderRadius: "2px",

    "&.MuiGrid-container": {
      padding: "7px 20px",
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  deactivateBtn: {
    color: "#6F35D4",
    textTransform: "inherit",
    fontWeight: "bold",
  },
});

export default function DeactivateAccount() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      await API.auth.deleteAccount();
      dispatch(showMessage({ message: "Deleted Account Successfully.", variant: "success" }));
      dispatch(authActions.logoutRequest());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container item className={classes.root} justify="space-between">
      <div className={classes.label}>
        <CustomInputLabel>Want to take a break from SneakQIK</CustomInputLabel>
      </div>
      <div>
        <Button
          className={classes.deactivateBtn}
          onClick={() => {
            setOpen(true);
          }}
        >
          Deactivate my account
        </Button>
        <DeactivateModal
          onDelete={deleteAccount}
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        />
      </div>
    </Grid>
  );
}
