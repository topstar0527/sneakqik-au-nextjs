import React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import SmallQIKOfferIcon from "components/icons/SmallQIKOfferIcon";

export const styles = createStyles({
  root: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #6E33D4 0%, #47CDD1 107.58%)",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    marginRight: "3px",
    display: "inline-block",
  },

  alignedRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  icon: {
    width: "16px",
    height: "16px",
    marginRight: "3px",
  },

  aligned: {
    display: "block",
  },
});

type Props = WithStyles<typeof styles> & {
  aligned?: boolean;
  className?: string;
};

const QIKLabel: React.FC<Props> = (props) => {
  const { aligned, className, classes } = props;

  return (
    <div className={clsx(classes.root, className, aligned && classes.alignedRoot)}>
      <SmallQIKOfferIcon className={classes.icon} width="11" height="15" viewBox="0 0 11 15" />
      <span className={clsx(aligned && classes.aligned)}>QIK Deal</span>
    </div>
  );
};

export default withStyles(styles, { name: "QIKLabel" })(QIKLabel);
