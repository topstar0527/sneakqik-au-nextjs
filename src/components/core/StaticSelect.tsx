import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import _ from "lodash";

import CustomInputBase from "components/core/CustomInputBase";
import CustomInputLabel from "components/core/CustomInputLabel";

export default function StaticSelect(props) {
  const importedProps = _.pick(props, [
    "name",
    "autoWidth",
    "children",
    "classes",
    "displayEmpty",
    "inputProps",
    "MenuProps",
    "multiple",
    "native",
    "onChange",
    "onClose",
    "onOpen",
    "open",
    "renderValue",
    "SelectDisplayProps",
    "value",
    "variant",
    "disabled",
  ]);

  const { error, fullWidth, helperText, id, input, label, margin } = props;

  return (
    <FormControl className={props.className} fullWidth={fullWidth} margin={margin}>
      {label && (
        <CustomInputLabel shrink={true} id={id}>
          {label}
        </CustomInputLabel>
      )}
      <Select
        {...importedProps} //
        id={id}
        input={input || <CustomInputBase />}
        error={error}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }}
      ></Select>
      {Boolean(helperText) && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
