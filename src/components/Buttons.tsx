import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const GradientButton = withStyles(() => ({
  root: {
    height: 40,
    color: "#FFFFFF",
    background: "linear-gradient(270deg, #42CFD0 0%, rgba(255, 255, 255, 0) 98.35%), #6E33D4",
    "&:hover": {
      background: "linear-gradient(270deg, #42CFD0 0%, rgba(255, 255, 255, 0) 98.35%), #6E33D4",
    },
  },
}))(Button);

export const GoogleButton = withStyles(() => ({
  root: {
    height: 40,
    color: "#FFFFFF",
    backgroundColor: "#E1584B",
    "&:hover": {
      backgroundColor: "#E1584B",
    },
  },
}))(Button);

export const FacebookButton = withStyles(() => ({
  root: {
    height: 40,
    color: "#FFFFFF",
    backgroundColor: "#3B5998",
    "&:hover": {
      backgroundColor: "#3B5998",
    },
  },
}))(Button);
