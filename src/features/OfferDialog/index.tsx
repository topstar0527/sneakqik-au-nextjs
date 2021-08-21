import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import OfferPost from "components/shared/OfferPost";
import actions from "store/actions";
import { getSelectedBrand } from "store/auth/reducer";
import { closeNewOfferDialog, closeEditOfferDialog } from "store/offers/actions";
import { getOfferDialog } from "store/offers/reducer";

import OfferForm from "./OfferForm";
import { OfferFormSchema, OfferFormInitValues, OfferFormType } from "./types";

const Html5Entities = require("html-entities").Html5Entities;

const entities = new Html5Entities();

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    maxWidth: "1150px",
    margin: "18px",

    [theme.breakpoints.down("xs")]: {
      "&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody": {
        maxWidth: "calc(100% - 36px)",
      },
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    paddingBottom: 18,
  },
}));

const OfferDialog: React.FunctionComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const selectedBrand = useSelector(getSelectedBrand);

  const offerDialog = useSelector(getOfferDialog);

  const errors = useSelector((state: any) => state.merchant.brands.errors);

  const handleClose = () => {
    if (offerDialog.type === "new") dispatch(closeNewOfferDialog());
    else dispatch(closeEditOfferDialog());
  };

  const handleSubmit = async (values: OfferFormType) => {
    values.description = entities.decode(values.description);

    if (offerDialog.type === "new") {
      if (values.image === null) values.image = "";
      if (values.price === null) values.price = "";
      if (values.publishedDate === null) values.publishedDate = "";

      dispatch(actions.merchant.brands.createOfferRequest({ ...values, brand: selectedBrand.id }));
    } else {
      if (typeof values.image === "string") delete values.image;
      if (values.image === null) values.image = "";
      if (values.price === null) values.price = "";
      if (values.publishedDate === null) values.publishedDate = "";

      dispatch(actions.merchant.brands.updateOfferRequest({ ...values, brand: selectedBrand.id }));
    }
  };

  const formik = useFormik<OfferFormType>({
    initialValues: OfferFormInitValues,
    validationSchema: OfferFormSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    if (errors) {
      formik.setErrors(errors);
    }
  }, [formik.setErrors, errors]);

  const initDialog = React.useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (offerDialog.type === "edit" && offerDialog.data) {
      formik.resetForm({ values: offerDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (offerDialog.type === "new") {
      formik.resetForm({ values: OfferFormInitValues });
    }
  }, [offerDialog.data, offerDialog.type, formik.resetForm]);

  React.useEffect(() => {
    if (offerDialog.props.open) {
      initDialog();
    }
  }, [offerDialog.props.open, initDialog]);

  const status = offerDialog.data?.status || OfferFormInitValues.status;

  const isOfferSaving = useSelector((state: any) => state.merchant.brands.isOfferSaving);
  return (
    <Dialog
      className={classes.root} //
      {...offerDialog.props}
      scroll="body"
      PaperProps={{ className: classes.paper }}
      disableEscapeKeyDown={false}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">
          {offerDialog.type === "new" ? "Post a kickass offer or product deal" : "Edit offer"}
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.dialogContent} dividers={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <OfferForm formik={formik} isSaving={isOfferSaving} type={offerDialog.type} status={status} />
          </Grid>

          <Hidden only="xs">
            <Grid item xs={12} md={6}>
              <OfferPost brand={selectedBrand} offer={formik.values} previewMode={true} />
            </Grid>
          </Hidden>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
