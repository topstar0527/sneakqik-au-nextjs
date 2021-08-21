import React from "react";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.primary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    margin: "8px 0",
    padding: "8px 12px",
    fontSize: "14px",
    lineHeight: "17px",
  },
}));

function BootstrapTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow placement="top" classes={classes} {...props} />;
}

export default BootstrapTooltip;
