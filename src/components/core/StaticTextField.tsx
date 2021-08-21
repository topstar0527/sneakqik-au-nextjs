import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import CustomInputBase from "components/core/CustomInputBase";
import CustomInputLabel from "components/core/CustomInputLabel";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LabelInputBase = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "3px",
    },
  },
  input: {
    position: "relative",
    padding: "8px 0",
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
  multiline: {
    padding: 0,
  },
}))(InputBase);

function StaticTextField(props) {
  const classes = useStyles();

  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "classes",
    "className",
    "color",
    "defaultValue",
    "disabled",
    "error",
    "fullWidth",
    "hiddenLabel",
    "id",
    // "InputProps",
    "inputRef",
    "multiline",
    "name",
    "onBlur",
    "onChange",
    "onClick",
    "onFocus",
    "placeholder",
    "required",
    "rows",
    "rowsMax",
    "select",
    "SelectProps",
    "type",
    "value",
    "variant",
  ]);

  const { InputLabelProps, label } = props;
  const { FormHelperTextProps, helperText } = props;
  const { error, fullWidth, id, margin, required, variant } = props;

  return (
    <FormControl className={classes.root} margin={margin} fullWidth={fullWidth}>
      {label && (
        <CustomInputLabel {...InputLabelProps} shrink={true} id={id}>
          {label}
          {required && "\u00a0*"}
        </CustomInputLabel>
      )}
      {variant != "label" && <CustomInputBase {...importedProps} />}
      {variant == "label" && <LabelInputBase {...importedProps} disabled placeholder="" />}

      <FormHelperText {...FormHelperTextProps} error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}

export default React.memo(StaticTextField);
