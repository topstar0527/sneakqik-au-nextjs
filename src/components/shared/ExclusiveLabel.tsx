import React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import SmallExclusiveIcon from "components/icons/SmallExclusiveIcon";

export const styles = createStyles({
  root: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "bold",
    background: "linear-gradient(0deg, #6E33D4, #6E33D4)",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    marginRight: "3px",
    display: "inline-block",
  },

  icon: {
    width: "11px",
    height: "14px",
    marginRight: "3px",
  },
});

type Props = WithStyles<typeof styles> & {
  className?: string;
};

const ExclusiveLabel: React.FC<Props> = (props) => {
  const { className, classes } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <SmallExclusiveIcon className={classes.icon} width="11" height="15" viewBox="0 0 11 15" />
      Exclusive
    </div>
  );
};

export default withStyles(styles, { name: "ExclusiveLabel" })(ExclusiveLabel);
