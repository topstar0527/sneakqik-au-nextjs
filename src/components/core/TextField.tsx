import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

import EyeIcon from "assets/icons/eye.svg";

const useStyles = makeStyles({
  root: {},

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

  helperRoot: {
    fontSize: "10px",
    lineHeight: "12px",
    color: "#2D2D2D",
  },
});

export type CustomTextFieldProps = TextFieldProps & {
  showHelper?: boolean;
};

const CustomTextField: React.FunctionComponent<CustomTextFieldProps> = (props) => {
  const classes = useStyles();
  const { showHelper = false, ...restProps } = props;

  return (
    <>
      <TextField
        {...restProps}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            shrink: classes.labelShrink,
            formControl: classes.labelFormControl,
          },
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.helperRoot,
          },
        }}
      />
      {showHelper && (
        <FormHelperText>
          <SvgIcon style={{ fontSize: "15px", color: "#2D2D2D" }} component={EyeIcon} viewBox="0 0 12 11" />
          {"This information won't be shown to the users."}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomTextField;
