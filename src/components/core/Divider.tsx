import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  line: {
    border: "none",
    height: 1,
    margin: 0,
    flexShrink: 0,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: "17px",
    paddingLeft: 17,
    paddingRight: 17,
    color: "rgba(0, 0, 0, 0.12)",
  },
}));

export interface DividerProps {
  className: string;
  text: string;
}

export default function Divider(props: DividerProps) {
  const classes = useStyles();
  const { className, text } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <hr className={classes.line} />
      <span className={classes.text}>{text}</span>
      <hr className={classes.line} />
    </div>
  );
}
