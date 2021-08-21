import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import SmallFreebieIcon from "components/icons/SmallFreebieIcon";

export const styles = createStyles({
  root: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "bold",
    background: "linear-gradient(0deg, #D1AA47, #D1AA47)",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    marginRight: "3px",
    display: "inline-block",
  },

  icon: {
    width: "12px",
    height: "12px",
    marginRight: "3px",
  },
});

type Props = WithStyles<typeof styles> & {
  className?: string;
};

const FreebieLabel: React.FC<Props> = (props) => {
  const { className, classes } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <SmallFreebieIcon className={classes.icon} width="11" height="15" viewBox="0 0 11 15" />
      Freebies
    </div>
  );
};

export default withStyles(styles, { name: "FreebieLabel" })(FreebieLabel);
