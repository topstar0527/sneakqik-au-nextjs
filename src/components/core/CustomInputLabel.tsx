import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

const CustomInputLabel = withStyles(() => ({
  root: {
    position: "static",
    padding: 0,
    fontFamily: ["Roboto", "Open Sans", "Arial", "sans-serif"].join(","),
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "17px",
    color: "#001B36",
    transform: "none",
  },
  focused: {
    color: "#001B36 !important",
  },
}))(InputLabel);

export default CustomInputLabel;
