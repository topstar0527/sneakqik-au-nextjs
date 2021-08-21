import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";

import Link from "components/core/Link";
import CMSGuestHeader from "components/header/CMSGuestHeader";
import CMSMerchantHeader from "components/header/CMSMerchantHeader";
import CMSUserHeader from "components/header/CMSUserHeader";
import AuthenticationForm from "features/AuthenticationForm";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    border: "1px solid #D7D7D7",
  },
  logoSection: {
    flexShrink: 0,
  },
  menuSection: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerBar: {
    position: "relative",
    maxWidth: "1280px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "24px",
    paddingRight: "24px",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "64px",
      paddingRight: "64px",
    },
  },
  title: {
    color: "#4A4A4A",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      fontFamily: "Roboto Slab",
      fontSize: 20,
    },
  },
  inputRoot: {
    color: "#DADADA",
    border: "1px solid #EBEBEB",
    paddingLeft: theme.spacing(1.2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
    backgroundColor: "#fff",
    color: "#000000",
  },

  dialogPaper: {
    marginLeft: "15px",
    marginRight: "15px",
  },
  dialogContent: {
    padding: 24,
  },
  dialogTitle: { padding: 0 },
  closeButton: { position: "absolute", right: 0 },
  paper: {
    padding: theme.spacing(2),
    height: theme.spacing(20),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    margin: theme.spacing(2),
  },
  registerBtn: {
    margin: theme.spacing(2),
  },
}));

export default function CMSHeader() {
  const classes = useStyles();
  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(authActions.closeDialog());
  };

  const authentication = () => {
    if (authState.user) {
      switch (authState.user.userType) {
        case "customer":
          return <CMSUserHeader />;
        case "merchant":
          return <CMSMerchantHeader />;
        default:
          return <CMSGuestHeader />;
      }
    } else {
      return <CMSGuestHeader />;
    }
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.headerBar}>
          <div className={classes.logoSection}>
            <Link href="/">
              <img src="/logo.gif" width="100px" height="21px" alt="SneakQIK" />
            </Link>
          </div>
          <div className={classes.menuSection}>{authentication()}</div>
        </Toolbar>
      </AppBar>

      <Dialog
        open={authState.open}
        maxWidth="xs"
        disableBackdropClick
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <IconButton
            disabled={authState.registerStatus === "pending"}
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <AuthenticationForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
