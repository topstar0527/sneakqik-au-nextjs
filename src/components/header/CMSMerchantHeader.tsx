import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Link from "components/core/Link";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles((theme: Theme) => ({
  sectionRight: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    marginRight: "12px",
    "& button": {
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
      color: "#6E33D4",
      outline: "none",
    },
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "12px",
  },
  avatarName: {
    fontWeight: "bold",
    textTransform: "none",
    fontSize: 12,
    padding: 0,
    marginLeft: 4,
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  alertBtn: {
    padding: 0,
    marginLeft: 10,
    marginRight: 25,
  },
  menu: {
    "& ul": {
      width: 149,
    },
    "& .MuiMenuItem-root": {
      padding: "10.865px 12.5px",
    },
  },
  backHomeLink: {
    marginRight: 40,
  },
}));

const CMSMerChantHeader = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(authActions.logoutRequest());
  };

  const user = useSelector((state: any) => state.auth.user);

  return (
    <ul className={classes.sectionRight}>
      <li className={classes.item}>
        <Button className={classes.backHomeLink}>
          <Link href="/">Back to SneakQIK</Link>
        </Button>
      </li>
      <li className={classes.avatar}>
        <Button
          disableRipple
          onClick={handleClick}
          className={classes.avatarName}
          endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {/* <Avatar className={classes.avatarSmall} alt={user.username} src={user.avatar} /> */}
          <Avatar className={classes.avatarSmall} alt={user.username}>
            <Image src={user.avatar} layout="fill" objectFit="cover" />
          </Avatar>
        </Button>

        <Menu
          // id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.menu}
        >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Report a problem</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </li>
    </ul>
  );
};

export default CMSMerChantHeader;
