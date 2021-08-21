import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GradientButton } from "components/Buttons";
import TextField from "components/core/TextField";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "24px",
    marginTop: 0,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "280px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  submit: {
    textAlign: "center",
    marginTop: 9,
  },

  submitBtn: {
    height: 40,
    width: 209,
  },

  inputField: {
    maxWidth: 587,
  },

  visitorsPerMonth: {
    "& p": {
      marginBottom: 0,
    },
  },

  select: {
    textAlign: "left",
  },

  labelRoot: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#202020",
    opacity: 0.3,
  },

  labelShrink: {
    fontWeight: "bold",
    transform: "translate(0, 1.5px) scale(0.83)",
    color: "#4A4A4A",
    opacity: 1,
  },

  labelFormControl: {
    "&.Mui-focused": {
      color: "#4A4A4A",
      "& .MuiFormLabel-asterisk": {
        color: "#4A4A4A",
      },
    },
  },
}));

export const ContactDetailSchema = Yup.object({
  businessName: Yup.string().required("Business Name is required."),
  numberOfVisitorsPerMonth: Yup.string(),
  primaryWebsite: Yup.string().url("Enter a valid url. Starts with https://").required("Primary Website is required."),
  contactPersonName: Yup.string().required("Full Name is required."),
  position: Yup.string().required("Position is required."),
  contactNumber: Yup.string().required("Contact Number is required."),
}).required();

export type ContactDetailType = Yup.InferType<typeof ContactDetailSchema>;

const ContactDetailInitValues: ContactDetailType = {
  businessName: "",
  numberOfVisitorsPerMonth: "",
  primaryWebsite: "",
  contactPersonName: "",
  position: "",
  contactNumber: "",
};

type ContactDetailFormProps = {
  actions: any;
  state: any;
};

const ContactDetailForm: React.FunctionComponent<ContactDetailFormProps> = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (values: ContactDetailType) => {
    props.actions.setupBusiness(values);
  };

  const formik = useFormik({
    initialValues: ContactDetailInitValues,
    validationSchema: ContactDetailSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    if (props.state.status === "success") {
      // props.actions.goNext();
      // set customer data
      const { info } = props.state;

      const customer = {
        email: encodeURIComponent(info.email),
        billing_address: {
          email: encodeURIComponent(info.email),
          company: encodeURIComponent(info.businessName),
          phone: encodeURIComponent(info.contactNumber),
        },
      };

      const { id: planId } = props.state.plan;
      //chargeBee checkout
      window.Chargebee.init({ site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE });

      const cbInstance = window.Chargebee.getInstance();

      const cart = cbInstance.getCart();

      cart.setCustomer(customer);

      const product = cbInstance.initializeProduct(planId);

      cart.replaceProduct(product);

      cbInstance.setCheckoutCallbacks(function (_cart: any) {
        // you can define a custom callbacks based on cart object
        return {
          loaded: function () {
            // eslint-disable-next-line no-console
            console.log("checkout opened");
          },
          close: function () {
            // eslint-disable-next-line no-console
            console.log("checkout closed");
          },
          success: async function (hostedPageId: any) {
            // eslint-disable-next-line no-console
            setLoading(true);
            await props.actions.saveChargeBeeToken({ hostedPageId });
            setLoading(false);
          },
          step: function (value: any) {
            // value -> which step in checkout
            // eslint-disable-next-line no-console
            console.log(value);
          },
        };
      });

      cart.proceedToCheckout();
    } else if (props.state.errors) {
      formik.setErrors(props.state.errors);
    }
  }, [props.state]);

  const business = props.state.user?.business;

  React.useEffect(() => {
    if (business) {
      formik.resetForm({ values: business });
    }
  }, [business]);

  const renderDesktopContactDetailForm = () => (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <div className={classes.inputField}>
        <Typography variant="body1" component="p" style={{ margin: "0 -20px 10px" }}>
          The below fields won’t be shown to the users.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="businessName"
              label="Business Name"
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessName && Boolean(formik.errors.businessName)}
              helperText={formik.touched.businessName && formik.errors.businessName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="primaryWebsite"
              label="Primary Website"
              name="primaryWebsite"
              value={formik.values.primaryWebsite}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.primaryWebsite && Boolean(formik.errors.primaryWebsite)}
              helperText={formik.touched.primaryWebsite && formik.errors.primaryWebsite}
            />
          </Grid>

          <Grid item xs={12} className={classes.visitorsPerMonth}>
            <FormControl className={classes.select} fullWidth>
              <InputLabel
                classes={{
                  root: classes.labelRoot,
                  shrink: classes.labelShrink,
                  formControl: classes.labelFormControl,
                }}
                id="visitors"
              >
                No. of Visitors Per Month
              </InputLabel>
              <Select
                variant="standard"
                fullWidth
                id="visitors"
                label="No. of Visitors Per Month"
                name="numberOfVisitorsPerMonth"
                value={formik.values.numberOfVisitorsPerMonth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numberOfVisitorsPerMonth && Boolean(formik.errors.numberOfVisitorsPerMonth)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1 - 5000">1 - 5000</MenuItem>
                <MenuItem value="5000 - 25,000">5000 - 25,000</MenuItem>
                <MenuItem value="25,000 - 75000">25,000 - 75000</MenuItem>
                <MenuItem value="75,000-250,000">75,000-250,000</MenuItem>
                <MenuItem value="250,000 - 500,000">250,000 - 500,000</MenuItem>
                <MenuItem value="500,000 - 1 million">500,000 - 1 million</MenuItem>
                <MenuItem value="1 million and above">1 million and above</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="contactPersonName"
              label="Full Name"
              name="contactPersonName"
              value={formik.values.contactPersonName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
              helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="position"
              label="Position"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="contactNumber"
              label="Contact number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            />
          </Grid>

          <Grid item xs={12} className={classes.submit}>
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              className={classes.submitBtn}
              disabled={!formik.isValid || props.state.status === "pending" || loading}
            >
              CHECKOUT
            </GradientButton>
          </Grid>
        </Grid>
      </div>
    </form>
  );

  const renderMobileContactDetailForm = () => (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" component="p">
            The below fields won’t be shown to the users.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="businessName"
            label="Business Name"
            name="businessName"
            value={formik.values.businessName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.businessName && Boolean(formik.errors.businessName)}
            helperText={formik.touched.businessName && formik.errors.businessName}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.select} fullWidth>
            <InputLabel
              classes={{
                root: classes.labelRoot,
                shrink: classes.labelShrink,
                formControl: classes.labelFormControl,
              }}
              id="visitors"
            >
              No. of Visitors Per Month
            </InputLabel>
            <Select
              variant="standard"
              fullWidth
              id="visitors"
              label="No. of Visitors Per Month"
              name="numberOfVisitorsPerMonth"
              value={formik.values.numberOfVisitorsPerMonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.numberOfVisitorsPerMonth && Boolean(formik.errors.numberOfVisitorsPerMonth)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1 - 5000">1 - 5000</MenuItem>
              <MenuItem value="5000 - 25,000">5000 - 25,000</MenuItem>
              <MenuItem value="25,000 - 75000">25,000 - 75000</MenuItem>
              <MenuItem value="75,000-250,000">75,000-250,000</MenuItem>
              <MenuItem value="250,000 - 500,000">250,000 - 500,000</MenuItem>
              <MenuItem value="500,000 - 1 million">500,000 - 1 million</MenuItem>
              <MenuItem value="1 million and above">1 million and above</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="primaryWebsite"
            label="Primary Website"
            name="primaryWebsite"
            value={formik.values.primaryWebsite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.primaryWebsite && Boolean(formik.errors.primaryWebsite)}
            helperText={formik.touched.primaryWebsite && formik.errors.primaryWebsite}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="contactPersonName"
            label="Full Name"
            name="contactPersonName"
            value={formik.values.contactPersonName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
            helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="position"
            label="Position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="contactNumber"
            label="Contact number"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
          />
        </Grid>

        <Grid item xs={12}>
          <GradientButton
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            size="large"
            color="primary"
            className={classes.submit}
            disabled={!formik.isValid || props.state.status === "pending" || loading}
          >
            GO TO PAYMENT
          </GradientButton>
        </Grid>
      </Grid>
    </form>
  );

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return matches ? renderDesktopContactDetailForm() : renderMobileContactDetailForm();
};

export default ContactDetailForm;
