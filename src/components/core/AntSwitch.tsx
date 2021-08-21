import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 11.6,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: "2.5px 3px",
      color: theme.palette.grey[500],

      "&$checked": {
        transform: "translateX(9px)",
        color: theme.palette.primary.main,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.common.white,
          borderColor: theme.palette.primary.main,
        },
        "& $thumb": {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 6.5,
      height: 6.5,
      boxShadow: "none",
    },
    track: {
      border: `2px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

export default AntSwitch;
