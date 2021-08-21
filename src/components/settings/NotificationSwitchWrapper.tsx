import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: 156,
    justifyContent: "space-between",

    "& .label-wrapper svg": {
      fontSize: 15,
      color: "#0000008A",
    },
    "& .label-wrapper p": {
      color: "#00000099",
      fontSize: 12,
      paddingLeft: 6,
    },
    "& .avatar-label": {
      display: "flex",
      alignItems: "center",
    },
    "& .avatar-label .label": {
      paddingLeft: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "& a": {
        color: "#6E33D4",
      },
    },
  },
  largeWidth: {
    maxWidth: 400,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function NotificationSwitchWrapper(props) {
  const classes = useStyles();
  return (
    <div className={`mb12 ${classes.root} ` + (props.largeWidth && `${classes.largeWidth}`)}>
      {props.label && (
        <div className={`label-wrapper ${classes.label}`}>
          {props.icon}
          <Typography>{props.label}</Typography>
        </div>
      )}
      {props.children}
    </div>
  );
}
