import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const LikeButton = withStyles((theme) => ({
  label: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",

      "& .MuiButton-startIcon": {
        margin: 0,
      },
    },
  },
}))(Button);

export default LikeButton;
