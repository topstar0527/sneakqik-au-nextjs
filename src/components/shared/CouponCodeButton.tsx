import React from "react";

import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";

import useTimeout from "hooks/useTimeout";
import { authActions } from "store/auth/actions";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  couponCode: {
    width: "103px",
    height: "30px",
    borderRadius: "2px",
    fontSize: "14px",
    lineHeight: "19px",
    fontWeight: "bold",
    marginBottom: "1px",
    padding: "inherit",
    "& > .MuiButton-label": {
      display: "block",
      background: "linear-gradient(90deg, #6E33D4 -0.29%, #FF0000 84.15%)",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
    },
  },

  couponLabel: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "12px",
    color: "#000000",
    opacity: "0.7",
  },

  loginToSeeButton: {
    opacity: 1,
    color: "#6D6D6D",
    fontSize: 13,
    fontWeight: "bold",

    paddingLeft: 6,
    paddingRight: 6,
    textTransform: "none",
    "& .MuiButton-startIcon": {
      display: "inline-block",
      marginLeft: -4,
      marginRight: 2,
    },
    "& .MuiButton-iconSizeMedium > *:first-child": {
      fontSize: 14,
    },
    "& > .MuiButton-label": {
      display: "block",
      background: "linear-gradient(90deg, #6E33D4 -0.29%, #FF0000 84.15%)",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      fontSize: 13,
    },
  },
});

type Props = {
  classes?: any;
  couponCode?: string;
  label?: string;
  offerUrl: string;
};

const CouponCodeButton: React.FC<Props> = (props) => {
  const { classes, couponCode = "", label = "GET COUPON", offerUrl } = props;

  const [isCopied, setCopied] = React.useState(false);

  useTimeout(() => setCopied(false), isCopied ? 20000 : 0);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const TRUE = true;

  return (
    <>
      {TRUE || user ? (
        <div className={classes.root}>
          <CopyToClipboard
            text={couponCode}
            onCopy={() => {
              setCopied(true);
              window.open(offerUrl, "_blank")?.focus();
            }}
          >
            <Button className={classes.couponCode} variant="contained" disableElevation>
              {couponCode}
            </Button>
          </CopyToClipboard>

          <Typography className={classes.couponLabel} variant="body2" align="center">
            {isCopied ? "Copied" : "Copy Code & Buy"}
          </Typography>
        </div>
      ) : (
        <Button
          disableElevation
          variant="contained"
          className={classes.loginToSeeButton}
          startIcon={<LockOutlinedIcon htmlColor={"#6E33D4"} />}
          onClick={(e) => {
            e.preventDefault();
            dispatch(authActions.showUserRegisterForm());
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default withStyles(styles, { name: "SneakQIK" })(CouponCodeButton);
