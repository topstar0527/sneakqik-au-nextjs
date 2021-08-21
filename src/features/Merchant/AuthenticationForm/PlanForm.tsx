import React from "react";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DesktopPlanForm from "./DesktopPlanForm";
import MobilePlanForm from "./MobilePlanForm";

type PlanFormProps = {
  actions: any;
  state: any;
};

const PlanForm: React.FunctionComponent<PlanFormProps> = (props) => {
  const [value, setValue] = React.useState(0);
  // const [storeValue, setStoreValue] = React.useState("2_4stores");

  // const handleMultiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setStoreValue(event.target.value as string);
  // };

  const handleChange = (value: number) => {
    setValue(value);
  };

  const handleSubmit = (plan) => {
    props.actions.goNext(plan);
  };

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return matches ? (
    <DesktopPlanForm onChange={handleChange} value={value} onSubmit={handleSubmit} />
  ) : (
    <MobilePlanForm onChange={handleChange} value={value} onSubmit={handleSubmit} />
  );
};

export default PlanForm;
