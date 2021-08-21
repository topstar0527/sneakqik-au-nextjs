import React from "react";

import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { DatePicker, MuiPickersUtilsProvider, DateTimePicker, TimePicker } from "@material-ui/pickers";
import clsx from "clsx";
import { FormikProps } from "formik";
import moment from "moment";
import ContentEditable from "react-contenteditable";
import Dropzone from "react-dropzone";

import { GradientButton } from "components/Buttons";
import CustomInputLabel from "components/core/CustomInputLabel";
import CustomToggleButton from "components/core/CustomToggleButton";
import StaticTextField from "components/core/StaticTextField";
import CouponCodeIcon from "components/icons/CouponCodeIcon";
import DollarIcon from "components/icons/DollarIcon";
import ExclusiveIcon from "components/icons/ExclusiveIcon";
import GiftCardIcon from "components/icons/GiftCardIcon";
import QIKOfferIcon from "components/icons/QIKOfferIcon";

import { OfferFormType } from "./types";

const useStyles = makeStyles({
  title: {
    fontWeight: 600,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  smallTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addPictureButton: {
    border: "1px dashed #4A4A4A",
    width: "100%",
    padding: "10px 0px",
    marginTop: 12,
  },

  dropzone: {
    width: "100%",
    height: "62px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F4F4F4",
    border: "1px dashed #E6E6E6",
    borderRadius: "2px",
    cursor: "pointer",
  },

  button: {
    marginLeft: 8,
    paddingLeft: 22,
    paddingRight: 23,
  },
  offerAddonsContainer: {
    border: "1px solid #CFD0D4",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(231, 231, 231, 0.25)",
    borderRadius: "5px",
  },
  offerAddonsToolbar: {
    borderBottom: "1px solid #CFD0D4",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonGroup: {
    "&>MuiButtonBase-root MuiCustomToggleButton-root": {
      border: "inherit",
    },
  },
  offerAddonsItem: {
    borderBottom: "1px solid #CFD0D4",
    padding: "10px 20px",
    "& .MuiFormLabel-root": {
      color: "black !important",
    },
    "& .MuiFormControlLabel-root": {
      color: "black !important",
    },
    "& .MuiCheckbox-root": {
      padding: "4px 4px !important",
    },
  },
  offerAddonsHelperText: {
    margin: "6px 0 0 32px",
    maxWidth: 300,
    color: "#4D4D4D",
  },
  description: {
    height: "5.0rem",
    padding: "0.5rem",
    overflowY: "auto",
    borderColor: "darkgray !important",
    outline: "none",
    "&:focus": {
      borderColor: "#7036D5 !important",
      borderWidth: "2px",
    },
  },
});

const Wire = ({ children, ...props }) => children(props);

const getAddons = (values) => {
  const addons: string[] = [];
  if (values.isExclusive) addons.push("is_exclusive");
  if (values.isQikOffer) addons.push("is_qik_offer");
  if (values.couponCode) addons.push("is_coupon_code");
  if (values.isFreebie) addons.push("is_freebie");
  if (values.isPrice) addons.push("is_price");
  return addons;
};

const OfferForm: React.FC<{ formik: FormikProps<OfferFormType>; isSaving: boolean; status: string; type: string }> = (
  props
) => {
  const classes = useStyles();

  const { formik, isSaving, status, type } = props;

  const [addons, setAddons] = React.useState<string[]>(getAddons(props.formik.values));
  const [expireTime, setExpireTime] = React.useState("23:59:59");

  const handleAddons = (_event, newAddons) => {
    const newIsFreebie = newAddons.indexOf("is_freebie") > -1;
    const newIsPrice = newAddons.indexOf("is_price") > -1;
    const isFreebie = addons.indexOf("is_freebie") > -1;
    const isPrice = addons.indexOf("is_price") > -1;

    if (newIsFreebie && !isFreebie) {
      newAddons = newAddons.filter(function (value, _index, _arr) {
        return value !== "is_price";
      });
    }
    if (newIsPrice && !isPrice) {
      newAddons = newAddons.filter(function (value, _index, _arr) {
        return value !== "is_freebie";
      });
    }

    if (newAddons.indexOf("is_freebie") === -1) formik.setFieldValue("isFreebie", false);

    if (newAddons.indexOf("is_price") === -1) {
      formik.setFieldValue("isPrice", false);
      formik.setFieldValue("price", "");
    } else formik.setFieldValue("isPrice", true);

    if (newAddons.indexOf("is_exclusive") === -1) formik.setFieldValue("isExclusive", false);

    if (newAddons.indexOf("is_coupon_code") === -1) formik.setFieldValue("couponCode", "");

    if (newAddons.indexOf("is_qik_offer") !== -1 && !formik.values.isQikOffer) {
      //reset expiry date when qik deal is set
      formik.setFieldValue("expireDate", moment().add(3, "day").endOf("day").toISOString());
    }

    formik.setFieldValue("isQikOffer", newAddons.indexOf("is_qik_offer") !== -1);

    setAddons(newAddons);
  };

  const handleDraft = () => {
    formik.setFieldValue("status", "draft");
    formik.handleSubmit();
  };

  const handlePost = () => {
    formik.setFieldValue("status", "published");
    formik.handleSubmit();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    // get text representation of clipboard
    const text = e.clipboardData?.getData("text/plain");

    // insert text manually
    document.execCommand("insertHTML", false, text);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StaticTextField
              required //
              id="title"
              name="title"
              label="Title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // error={formik.touched.title && Boolean(formik.errors.title)}
              // helperText={formik.touched.title && formik.errors.title}
            />

            {!formik.values.title && (
              <FormHelperText error={formik.touched.title && Boolean(formik.errors.title)}>
                {formik.touched.title && formik.errors.title}
              </FormHelperText>
            )}

            {formik.values.title && (
              <FormHelperText error={Boolean(formik.errors.title)}>
                {90 - formik.values.title.length >= 0
                  ? `Maximum 90 characters: ${90 - formik.values.title.length} remaining`
                  : `Maximum 90 characters: ${formik.values.title.length - 90} too many`}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <CustomInputLabel>Description</CustomInputLabel>
            <ContentEditable
              className={clsx(
                "border-solid border border-neutral focus:border-solid focus:border-2 focus:border-primary",
                classes.description
              )}
              html={formik.values.description}
              onChange={(e) => formik.setFieldValue("description", e.target.value, true)}
              onPaste={handlePaste}
            />
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              required //
              id="offerUrl"
              name="offerUrl"
              label="Offer URL"
              placeholder="E.g. https://www.kmart.com/offer"
              fullWidth
              value={formik.values.offerUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.offerUrl && Boolean(formik.errors.offerUrl)}
              helperText={formik.touched.offerUrl && formik.errors.offerUrl}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              name="expireDate"
              label="Expiry date"
              disabled={addons.indexOf("is_qik_offer") > -1}
              required
              fullWidth
              format="DD/MM/YYYY"
              value={formik.values.expireDate ? formik.values.expireDate : null}
              onChange={(date) => {
                if (date) {
                  formik.setFieldValue("expireDate", date.format("YYYY-MM-DD") + "T" + expireTime, true);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.expireDate && Boolean(formik.errors.expireDate)}
              helperText={formik.touched.expireDate && formik.errors.expireDate}
              TextFieldComponent={StaticTextField}
              disablePast
            />

            {addons.indexOf("is_qik_offer") > -1 && (
              <FormHelperText>Please set the expiration date in the QIK deal addon</FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TimePicker
              name="expireTime"
              label="Expiry time"
              disabled={addons.indexOf("is_qik_offer") > -1}
              fullWidth
              format="hh:mm A"
              value={expireTime ? moment(expireTime, "hh:mm:ss") : null}
              onChange={async (time) => {
                if (time) {
                  const expireDate = moment(formik.values.expireDate, "YYYY-MM-DD");
                  formik.setFieldValue(
                    "expireDate",
                    expireDate.format("YYYY-MM-DD") + "T" + time.format("hh:mm:ss"),
                    true
                  );
                  await setExpireTime(time.format("hh:mm:ss"));
                }
              }}
              onBlur={formik.handleBlur}
              TextFieldComponent={StaticTextField}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    // eslint-disable-next-line no-console
                    // console.log(acceptedFiles);
                    formik.setFieldValue("image", acceptedFiles[0], true);
                  }}
                >
                  {({ getInputProps, getRootProps }) => (
                    <div {...getRootProps({ className: classes.dropzone })}>
                      <input {...getInputProps()} />
                      <p>
                        <b>Upload image - </b> Choose aspect ratio 4:2.1 e.g 1200 x 630px or 600 x 315px
                      </p>
                    </div>
                  )}
                </Dropzone>
              </Grid>

              <Grid item xs={12} sm={6}>
                {formik.values.image && (
                  <div className="flex justify-between items-start">
                    <Typography variant="body1" component="span" style={{ wordBreak: "break-all" }}>
                      {formik.values.image instanceof File ? formik.values.image.name : formik.values.image}
                    </Typography>
                    <CloseIcon
                      color="primary"
                      onClick={() => {
                        formik.setFieldValue("image", null);
                      }}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
            {formik.errors.image && <FormLabel error>{formik.errors.image}</FormLabel>}
          </Grid>

          <Grid item xs={12}>
            <div className={classes.offerAddonsContainer}>
              <div className={classes.offerAddonsToolbar}>
                <Typography className="font-bold p-1" variant="subtitle1">
                  Add these to your offer?
                </Typography>
                <ToggleButtonGroup className={classes.buttonGroup} value={addons} onChange={handleAddons}>
                  {/* 
                    !!!!!do not refactor!!!!!!
                    Tooltip wrapped toggle buttons break highlight
                    https://github.com/mui-org/material-ui/issues/18091
                    Used props catcher pattern
                   */}
                  <Wire value="is_coupon_code">
                    {(props1) => (
                      <CustomToggleButton value="is_coupon_code" color="#FF2820" aria-label="coupon code" {...props1}>
                        <CouponCodeIcon />
                        <span>Coupon</span>
                      </CustomToggleButton>
                    )}
                  </Wire>

                  <Wire value="is_exclusive">
                    {(props1) => (
                      <CustomToggleButton value="is_exclusive" color="#6E33D4" aria-label="exclusive" {...props1}>
                        <ExclusiveIcon />
                        <span>Exclusive</span>
                      </CustomToggleButton>
                    )}
                  </Wire>

                  <Wire value="is_qik_offer">
                    {(props1) => (
                      <CustomToggleButton value="is_qik_offer" color="#6E33D4" aria-label="qik offer" {...props1}>
                        <QIKOfferIcon />
                        <span>QIK Deal</span>
                      </CustomToggleButton>
                    )}
                  </Wire>

                  <Wire value="is_price">
                    {(props1) => (
                      <CustomToggleButton value="is_price" color="#3677EA" aria-label="price" {...props1}>
                        <DollarIcon />
                        <span>Best Price</span>
                      </CustomToggleButton>
                    )}
                  </Wire>

                  <Wire value="is_freebie">
                    {(props1) => (
                      <CustomToggleButton value="is_freebie" color="#D1AA47" aria-label="freebie" {...props1}>
                        <GiftCardIcon />
                        <span>Freebie</span>
                      </CustomToggleButton>
                    )}
                  </Wire>
                </ToggleButtonGroup>
              </div>
              {addons.indexOf("is_coupon_code") > -1 && (
                <div className={classes.offerAddonsItem}>
                  <FormLabel style={{ display: "block", marginBottom: 8 }}>Enter coupon code</FormLabel>
                  <StaticTextField
                    required //
                    id="couponCode"
                    name="couponCode"
                    value={formik.values.couponCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.couponCode && Boolean(formik.errors.couponCode)}
                    helperText={formik.touched.couponCode && formik.errors.couponCode}
                  />
                </div>
              )}
              {addons.indexOf("is_exclusive") > -1 && (
                <div className={classes.offerAddonsItem}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary" //
                        id="isExclusive"
                        name="isExclusive"
                        checked={formik.values.isExclusive}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    }
                    label="Exclusive to SneakQIK users only?"
                  />
                </div>
              )}
              {addons.indexOf("is_qik_offer") > -1 && (
                <div className={classes.offerAddonsItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormLabel>QIK Deal? Choose expiry within 3 days</FormLabel>
                    <DateTimePicker
                      name="expireDate"
                      required
                      format="DD/MM/YYYY HH:mm"
                      value={formik.values.expireDate}
                      onChange={(date) => {
                        formik.setFieldValue("expireDate", date?.toISOString(), true);
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.expireDate && Boolean(formik.errors.expireDate)}
                      helperText={formik.touched.expireDate && formik.errors.expireDate}
                      TextFieldComponent={StaticTextField}
                      disablePast
                      maxDate={moment().add(3, "days")}
                    />
                  </div>
                </div>
              )}
              {addons.indexOf("is_price") > -1 && (
                <div className={classes.offerAddonsItem}>
                  <FormLabel style={{ display: "block", marginBottom: 8 }}>Enter price</FormLabel>
                  <StaticTextField
                    required //
                    id="price"
                    name="price"
                    value={formik.values.price || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </div>
              )}
              {addons.indexOf("is_freebie") > -1 && (
                <div className={classes.offerAddonsItem}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary" //
                        id="isFreebie"
                        name="isFreebie"
                        checked={formik.values.isFreebie}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    }
                    label="Mark as Freebie? ($0 + free shipping)"
                  />
                </div>
              )}
            </div>
          </Grid>

          <Grid item xs={12} className={classes.buttonContainer}>
            <Button className={classes.button} onClick={handleDraft} color="primary" disabled={isSaving}>
              SAVE DRAFT
            </Button>

            <GradientButton
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
              onClick={handlePost}
              disabled={isSaving}
            >
              {type === "new" || status === "draft" ? "POST OFFER" : "EDIT OFFER"}
            </GradientButton>
          </Grid>
        </Grid>
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default OfferForm;
