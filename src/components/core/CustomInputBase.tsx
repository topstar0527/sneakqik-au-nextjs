import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";

const CustomInputBase = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "3px",
    },
  },
  input: {
    position: "relative",
    padding: "8px 16px",
    backgroundColor: theme.palette.common.white,

    fontFamily: ["Roboto", "Open Sans", "Arial", "sans-serif"].join(","),
    fontSize: "14px",
    lineHeight: "17px",
    color: "#4A4A4A",
    width: "100%",
    height: "auto",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {},
  },
  notchedOutline: {
    border: "1px solid #C9D6DF",
  },
  multiline: {
    padding: 0,
  },
}))(OutlinedInput);

export default CustomInputBase;
