import React from "react";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "flex",
    alignItems: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  notificationsWrapper: {
    padding: "2px 18px",
    marginBottom: 8,

    "& .mb12": {
      marginBottom: 12,
    },
    "& .bold": {
      fontWeight: "bold",
    },
    "& .blackop60": {
      color: "#00000099",
    },
  },
  notifications: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationTypes: {
    display: "flex",
    "& svg": {
      fontSize: 14,
    },
  },
  titleBox: {
    paddingLeft: 8.6,
  },
  title: {
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    color: "#4A4A4A99",
  },
  collapse: {
    "& p": {
      fontSize: 12,
    },
  },
}));

export default function CollapseContent(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper className={classes.notificationsWrapper} elevation={0}>
      <div className={classes.notifications}>
        <div className={classes.notificationTypes}>
          {props.titleIcon}
          <div className={classes.titleBox}>
            <Typography className={classes.title}>{props.title}</Typography>
            <Typography className={classes.subTitle}>{props.subTitle}</Typography>
          </div>
        </div>
        <div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <Collapse className={classes.collapse} in={expanded} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>
    </Paper>
  );
}
