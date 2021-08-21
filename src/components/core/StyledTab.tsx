import React from "react";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#C7C7C7",
      opacity: 1,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(17),
      width: "92px",
      marginRight: theme.spacing(1),

      "&:focus": {
        color: "#804BDB",
        opacity: 1,
      },
    },
    selected: {
      color: "#804BDB",
      opacity: 1,
    },
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export default StyledTab;
