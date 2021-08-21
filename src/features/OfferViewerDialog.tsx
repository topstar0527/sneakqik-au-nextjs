import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";

import ConnectedOfferViewer from "components/shared/ConnectedOfferViewer";
import { closeViewOfferDialog } from "store/offers/actions";
import { getOfferViewerDialog } from "store/offers/reducer";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    maxWidth: "1140px",
    margin: "18px",
    width: "calc(100% - 36px)",

    [theme.breakpoints.down("xs")]: {
      "&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody": {
        maxWidth: "calc(100% - 36px)",
      },
    },
  },

  dialogContent: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "14px",
      paddingRight: "14px",
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const OfferViewerDialog = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const viewerDialog = useSelector(getOfferViewerDialog);

  const handleClose = () => {
    dispatch(closeViewOfferDialog());
  };

  if (viewerDialog.data) {
    const { offer: offerSlug } = viewerDialog.data;

    return (
      <Dialog
        scroll="paper"
        PaperProps={{ className: classes.dialogPaper }}
        onClose={handleClose}
        aria-labelledby="offer viewer dialog"
        {...viewerDialog.props}
      >
        <DialogContent classes={{ root: classes.dialogContent }} dividers={false}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          <ConnectedOfferViewer slug={offerSlug} isModal={true} />
        </DialogContent>
      </Dialog>
    );
  } else return null;
};

export default OfferViewerDialog;
