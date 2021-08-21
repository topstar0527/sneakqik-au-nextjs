import { withStyles } from "@material-ui/core/styles";
import ToggleButton, { ToggleButtonProps } from "@material-ui/lab/ToggleButton";

const StyledToggleButton = withStyles(() => ({
  root: {
    width: 59,
    height: 48,
    border: "none",
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: "13px",
    padding: "4px 0 6px 0",
    color: (props: CustomToggleButtonProps) => props.color,
    "&.Mui-selected": {
      backgroundColor: "rgba(16, 16, 16, 0.05)",
      color: (props: CustomToggleButtonProps) => props.color,
    },
  },
  label: {
    display: "flex",
    flexDirection: "column",
    textTransform: "none",

    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
}))(ToggleButton);

type CustomToggleButtonProps = ToggleButtonProps & { color: "string" };

function CustomToggleButton(props: CustomToggleButtonProps) {
  return <StyledToggleButton {...props} />;
}

export default CustomToggleButton;
