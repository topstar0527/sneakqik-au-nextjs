import React from "react";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DesktopSubscriptionPlanForm from "./DesktopSubscriptionPlanForm";
import MobileSubscriptionPlanForm from "./MobileSubscriptionPlanForm";

type SubscriptionPlanFormProps = {
  actions: any;
  state: any;
};

const SubscriptionPlanForm: React.FunctionComponent<SubscriptionPlanFormProps> = (props) => {
  const [value, setValue] = React.useState(0);
  // const [storeValue, setStoreValue] = React.useState("2_4stores");

  // const handleMultiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setStoreValue(event.target.value as string);
  // };

  const handleChange = (value: number) => {
    setValue(value);
  };

  const handleSubmit = () => {
    props.actions.goNext();
  };

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return matches ? (
    <DesktopSubscriptionPlanForm onChange={handleChange} value={value} onSubmit={handleSubmit} />
  ) : (
    <MobileSubscriptionPlanForm onChange={handleChange} value={value} onSubmit={handleSubmit} />
  );
};

export default SubscriptionPlanForm;
