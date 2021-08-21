import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6E33D4",
    },
    secondary: {
      main: "#6F88FC",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#4A4A4A",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Open Sans"', "Arial", "sans-serif"].join(","),
    body1: {
      fontSize: "13px",
      lineHeight: 1.25,
    },
    body2: {
      fontSize: "12px",
      lineHeight: "14px",
    },
    button: {
      textTransform: "none",
      fontSize: "14px",
    },
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
