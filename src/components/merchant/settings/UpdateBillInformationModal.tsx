import React from "react";

import MomentUtils from "@date-io/moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { GradientButton } from "components/Buttons";
import StaticSelect from "components/core/StaticSelect";
import StaticTextField from "components/core/StaticTextField";
import CreditCardIcon from "components/icons/CreditCardIcon";

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
  saveBtn: {
    fontWeight: "bold",
    height: 40,
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 22,
    textAlign: "center",
  },
}));

const PaymentInfoFormInitValues = {
  cardNumber: "",
  expireDate: moment().endOf("day").toISOString(),
  cvc: "",
  nameOnCard: "",
  countryRegion: "AU",
};

const PaymentInfoSchema = Yup.object({
  cardNumber: Yup.string().required("Card number is required").max(16, "Maximum 15 characters"),
  expireDate: Yup.string(),
  cvc: Yup.string().required("CVC is required").max(4, "Maximum 4 characters"),
  nameOnCard: Yup.string().required("Name on card is required"),
  countryRegion: Yup.string().required("Country or region is required"),
}).required();

export default function UpdateBillInformationModal(props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: PaymentInfoFormInitValues,
    validationSchema: PaymentInfoSchema,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {
      //do nothing for now
    },
  });

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
          Update billing information
        </Typography>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ position: "relative" }}>
                <StaticTextField
                  required //
                  id="cardNumber"
                  name="cardNumber"
                  label="Card number"
                  placeholder="0000-0000-0000-000"
                  fullWidth
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                  helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                />
                <CreditCardIcon
                  style={{ position: "absolute", right: 15, bottom: formik.errors.cardNumber ? 31 : 14 }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  name="expireDate"
                  label="Expiry date"
                  required
                  value={formik.values.expireDate}
                  onChange={(date) => {
                    formik.setFieldValue("expireDate", date?.toISOString(), true);
                  }}
                  fullWidth
                  format="DD/MM/YYYY"
                  TextFieldComponent={StaticTextField}
                  disablePast
                />
              </Grid>
              <Grid item xs={6}>
                <StaticTextField
                  required //
                  id="cvc"
                  name="cvc"
                  label="CVC"
                  fullWidth
                  value={formik.values.cvc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                  helperText={formik.touched.cvc && formik.errors.cvc}
                />
              </Grid>
              <Grid item xs={12}>
                <StaticTextField
                  required //
                  id="nameOnCard"
                  name="nameOnCard"
                  label="Name on card"
                  fullWidth
                  value={formik.values.nameOnCard}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)}
                  helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
                />
              </Grid>
              <Grid item xs={12}>
                <StaticSelect
                  id="countryRegion"
                  name="countryRegion"
                  label="Country or region"
                  fullWidth
                  displayEmpty
                  value={formik.values.countryRegion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.countryRegion && Boolean(formik.errors.countryRegion)}
                  helperText={formik.touched.countryRegion && formik.errors.countryRegion}
                >
                  <MenuItem value="AU">Australia</MenuItem>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="JP">Japan</MenuItem>
                </StaticSelect>
              </Grid>
            </Grid>

            <GradientButton
              fullWidth
              variant="contained"
              disableElevation
              color="primary"
              className={classes.saveBtn}
              onClick={props.onCancel}
            >
              Save
            </GradientButton>
          </form>
        </MuiPickersUtilsProvider>
      </DialogContent>
    </Dialog>
  );
}
