/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { GradientButton } from "components/Buttons";
import { closeUpgradeDialog } from "store/offers/actions";

export default function UpgradeDialog() {
  const open = useSelector((state: any) => state.offers.upgradeDialog.open);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeUpgradeDialog());
  };

  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/merchant/settings/subscription");
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add unlimited offers</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You can add unlimited offers, drive more traffic to your brand, and see detailed tracking of SneakQIK users
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="flex-1">
          <GradientButton
            className="m-1"
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleUpgrade}
          >
            Upgrade
          </GradientButton>

          <Button className="m-1" fullWidth onClick={handleClose} color="primary">
            Don't add offer
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
