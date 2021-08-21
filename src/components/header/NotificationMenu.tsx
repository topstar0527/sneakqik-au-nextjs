import React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import Link from "components/core/Link";
import useInterval from "hooks/useInterval";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles({
  root: {
    width: 280,
    maxHeight: 500,
    overflowY: "auto",
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    "& > span": {
      fontSize: 14,
      fontWeight: "bold",
      color: "#4A4A4A",
    },
    "& > a": {
      color: "#6E33D4",
    },
  },
  menuItem: { paddingTop: 10, paddingBottom: 10, paddingRight: 20, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" },
  line: {
    display: "flex",
    whiteSpace: "normal",
    fontSize: 12,
    "& > *+*": {
      marginLeft: 8,
    },
  },
  lineImg: {
    width: 40,
    height: 40,
    border: "1px solid #E9E9E9",
    borderRadius: "50%",
  },
  lineData: {
    "& span": {
      color: "#4A4A4A",
    },
    "& a": {
      color: "#6E33D4",
    },
  },
  lineTime: {
    color: "#CCC",
  },
  seeall: {
    padding: "8px 0",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#6E33D4",
    fontWeight: "bold",
  },
  empty: {
    padding: "16px 0",
    textAlign: "center",
    color: "#CCC",
  },
  btn: {
    position: "relative",
  },
  point: {
    position: "absolute",
    top: 17,
    left: 25,
    width: 8,
    height: 8,
    background: "#6E33D4",
    borderRadius: "50%",
  },
  link: { color: "#6E33D4 !important" },
  closeNotification: {
    color: "#ddd",
    position: "absolute",
    top: 0,
    right: 3,
    padding: "4px",
    "&:hover": {
      color: "#ccc",
    },
  },
});

const useNotifications = () => {
  const dispatch = useDispatch();

  const getNotifications = React.useCallback(() => {
    dispatch(authActions.getNotificationsRequest());
  }, []);

  useInterval(getNotifications, 60000);

  React.useEffect(getNotifications, []);

  return useSelector((state: any) => state.auth.notifications);
};

export default function NotificationMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkNotificationRead = React.useCallback((payload) => {
    dispatch(authActions.markNotificationReadRequest(payload));
  }, []);

  const notifications = useNotifications();

  const getNotificationItems = () =>
    notifications.map((data, index) => {
      let item;
      switch (data.type) {
        case "new_comment":
        case "new_offer":
        default:
          item = (
            <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
              <div className={classes.line}>
                <img
                  src={
                    data.actor.image
                      ? data.actor.image
                      : `https://www.tinygraphs.com/squares/${data.id}?theme=bythepool&numcolors=4&size=220&fmt=svg`
                  }
                  className={classes.lineImg}
                />
                <div className={classes.lineData}>
                  <div>
                    <span>
                      <b>{data.actor.name}</b> {data.verb}:{" "}
                    </span>
                    {data.actionObject.slug ? (
                      <Link naked href={`[offerSlug]`} as={`/${data.actionObject.slug}`}>
                        {data.actionObject.name}
                      </Link>
                    ) : (
                      <span className={classes.link}>{data.actionObject.name}</span>
                    )}
                  </div>
                  <div className={classes.lineTime}>{moment(data.timestamp ?? moment()).fromNow()}</div>
                </div>
              </div>
              <IconButton
                aria-label="read"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkNotificationRead(data);
                }}
                className={classes.closeNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          );
          break;

        case "single_offer_expired":
          item = (
            <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
              <div className={classes.line}>
                <img src={data.actionObject.image} className={classes.lineImg} />
                <div className={classes.lineData}>
                  <span>
                    Expired:{" "}
                    <Link naked href={`[offerSlug]`} as={`/${data.actionObject.slug}`}>
                      <strong>{data.actionObject.name}</strong>
                    </Link>
                  </span>
                  <div className={classes.lineTime}>{moment(data.timestamp ?? moment()).fromNow()}</div>
                </div>
              </div>
              <IconButton
                aria-label="read"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkNotificationRead(data);
                }}
                className={classes.closeNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          );
          break;

        case "brand_all_offers_expired":
          item = (
            <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
              <div className={classes.line}>
                <img src={data.actionObject.image} className={classes.lineImg} />
                <div className={classes.lineData}>
                  <span>
                    Expired: all offers in{" "}
                    <Link naked href={`[brandSlug]`} as={`/${data.actionObject.slug}`}>
                      <strong>{data.actionObject.name}</strong>
                    </Link>
                  </span>
                  <div className={classes.lineTime}>{moment(data.timestamp ?? moment()).fromNow()}</div>
                </div>
              </div>
              <IconButton
                aria-label="read"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkNotificationRead(data);
                }}
                className={classes.closeNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          );
          break;

        case "brand_milestone":
          item = (
            <MenuItem key={index} onClick={handleClose} className={classes.menuItem}>
              <div className={classes.line}>
                <img src={data.actionObject.image} className={classes.lineImg} />
                <div className={classes.lineData}>
                  <div>
                    <span>
                      🎉 {data.data.emailContext.milestoneActivityCount}{" "}
                      {data.data.emailContext.milestoneActivityCategory} for{" "}
                      <Link naked href={`[brandSlug]`} as={`/${data.actionObject.slug}`}>
                        <strong>{data.actionObject.name}</strong>
                      </Link>
                    </span>
                  </div>
                  <div className={classes.lineTime}>{moment(data.timestamp ?? moment()).fromNow()}</div>
                </div>
              </div>
              <IconButton
                aria-label="read"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkNotificationRead(data);
                }}
                className={classes.closeNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          );
          break;
      }

      return item;
    });

  return (
    <div>
      <IconButton className={classes.btn} onClick={handleClick}>
        <NotificationsNoneOutlinedIcon fontSize="default" />
        {notifications.length > 0 && <span className={classes.point}></span>}
      </IconButton>

      <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement="bottom-end" disablePortal>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className={classes.root}>
            <div className={classes.head}>
              <span>Notifications</span>
              <Link naked href="/settings/notifications">
                Settings
              </Link>
            </div>
            <Divider />
            {(notifications.length === 0 || true) && <div className={classes.empty}>No Notifications</div>}
            {false && getNotificationItems()}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
