import React from "react";
import dynamic from 'next/dynamic'

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";

import actions from "store/merchant/brands/actions";

const ConnectWithCommunity = dynamic(() => import('./ConnectWithCommunity'));
const TakeTheTutorial = dynamic(() => import('./TakeTheTutorial'));
const UploadPhoto = dynamic(() => import('./UploadPhoto'));
const WelcomeForm = dynamic(() => import('./WelcomeForm'));

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    minWidth: "500px",
    maxWidth: "500px",
    margin: "18px",

    [theme.breakpoints.down("xs")]: {
      "&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody": {
        maxWidth: "calc(100% - 36px)",
        width: "calc(100% - 36px)",
        minWidth: "inherit",
      },
    },
  },
  closeButton: { position: "absolute", right: 0, top: 0 },
}));

function getStepContent(step) {
  switch (step) {
    case 0:
      return <WelcomeForm />;
    case 1:
      return <ConnectWithCommunity />;
    case 2:
      return <UploadPhoto />;
    case 3:
      return <TakeTheTutorial />;
  }
}

export default function BrandEditorDialog() {
  const classes = useStyles();

  const open = useSelector((state: any) => state.merchant.brands.draft.open);

  const activeStep = useSelector((state: any) => state.merchant.brands.draft.activeStep);

  const draftState = useSelector((state: any) => state.merchant.brands.draft);

  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(actions.initDraftEditor({ open: false }));
  };

  return (
    <Dialog
      scroll="body" //
      open={open}
      PaperProps={{ className: classes.dialogPaper }}
    >
      <DialogContent dividers={false}>
        {draftState.closable && (
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        )}
        {getStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
}
