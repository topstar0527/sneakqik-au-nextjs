import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import TextField from "components/core/TextField";

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {},

  dialogPaper: {
    marginLeft: "18px",
    marginRight: "18px",
    width: "calc(100% - 36px)",
  },

  dialogTitle: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "24px",
    color: "#2D2D2D",
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  dialogContent: {},

  discount: {
    borderRadius: "3px",
    height: "39px",
    marginTop: "10px",
    marginBottom: "15px",
  },

  textField: {
    height: "40px",
  },

  checkboxLabel: {
    fontWeight: "normal",
    lineHeight: "14px",
  },
}));

type CompleteYourOrderDialogProps = DialogProps & {
  onClose: () => void;
};

const CompleteYourOrderDialog: React.FunctionComponent<CompleteYourOrderDialogProps> = (props) => {
  const classes = useStyles();

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog
      className={classes.dialog}
      PaperProps={{ className: classes.dialogPaper }}
      maxWidth="xs"
      fullWidth
      {...props}
    >
      <DialogTitle disableTypography id="customized-dialog-title">
        <Typography className={classes.dialogTitle} variant="h6" align="center">
          Complete your order
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <form className="flex flex-col" noValidate>
          <Typography className="text-gray-900" gutterBottom align="left">
            <strong>Pro Membership</strong> Subscription
          </Typography>

          <Typography gutterBottom align="right">
            (Billed Monthly) ............$99 AUD
          </Typography>

          <Typography gutterBottom align="right">
            GST (10%) ............ $9 AUD
          </Typography>

          <TextField
            className={classes.discount}
            variant="outlined"
            size="small"
            fullWidth
            label="Apply Discount Code"
            name="discountCode"
          />

          <div className="flex justify-between items-center text-gray-900 mb-6">
            <Typography gutterBottom>
              <strong>Total</strong>
            </Typography>
            <Typography gutterBottom>
              <strong>$108 AUD per month</strong>
            </Typography>
          </div>

          <Typography variant="h6" component="h6">
            Pay with Card
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="standard"
                fullWidth
                label="Card information(0000 0000 0000 0000)"
                name="cardNumber"
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                className={classes.textField}
                size="small"
                variant="standard"
                fullWidth
                label="MM/YY"
                name="date"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className={classes.textField}
                size="small"
                variant="standard"
                fullWidth
                label="CVC"
                name="cvc"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                size="small"
                variant="standard"
                fullWidth
                label="Name on Card"
                name="nameOnCard"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                size="small"
                variant="standard"
                fullWidth
                label="Country or region"
                name="countryOrRegion"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="terms"
                      name="terms"
                      value="allowExtraEmails"
                      color="primary"
                      style={{ alignSelf: "baseline", paddingTop: 6 }}
                    />
                  }
                  label={
                    <span className={classes.checkboxLabel}>
                      I agree to the<Link href="#">Terms of Service</Link>.
                    </span>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <GradientButton
                onClick={handleSubscribe}
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                size="large"
              >
                SUBSCRIBE
              </GradientButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteYourOrderDialog;
