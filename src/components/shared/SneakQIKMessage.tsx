import React from "react";

import { green, amber, blue } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { hideMessage } from "store/message/actions";
import { MessageOptions } from "store/message/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  success: {
    backgroundColor: green[600],
    color: "#FFFFFF",
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  },
  info: {
    backgroundColor: blue[600],
    color: "#FFFFFF",
  },
  warning: {
    backgroundColor: amber[600],
    color: "#FFFFFF",
  },
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error_outline",
  info: "info",
};

function SneakQIKMessage() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.message.state);
  const options: MessageOptions = useSelector((state: any) => state.message.options);

  const classes = useStyles();

  return (
    <Snackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      classes={{
        root: classes.root,
      }}
    >
      <SnackbarContent
        className={clsx(classes[options.variant])}
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon className="mr-3" color="inherit">
                {variantIcon[options.variant]}
              </Icon>
            )}
            <Typography className="text-white text-sm font-bold">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={() => dispatch(hideMessage())}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default React.memo(SneakQIKMessage);
