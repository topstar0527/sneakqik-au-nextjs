import React from "react";

import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Link from "components/core/Link";
import { customerSettingsRoutes, merchantSettingsRoutes } from "data/routes";
import { getUser } from "store/auth/reducer";

const useStyles = makeStyles(() => ({
  menuItem: {
    paddingLeft: 26,
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",

    "&.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover, &.MuiListItem-button:hover": {
      backgroundColor: "#6E33D4",
      background: "linear-gradient(90deg, #6E33D4 7.83%, #42CFD0 106.05%)",
      borderTopLeftRadius: "20px",
      borderBottomLeftRadius: "20px",
      transition: "none !important",
      "& .MuiTypography-root": {
        fontWeight: "bold",
        color: "white",
      },
    },
  },
}));

export const SettingsSidebar: React.FC = () => {
  const classes = useStyles();

  const router = useRouter();

  const user = useSelector(getUser);

  const routes = user ? (user.userType === "customer" ? customerSettingsRoutes : merchantSettingsRoutes) : [];

  return (
    <div className="mt-8">
      <Typography className="mb-3 ml-2 text-base font-bold">Settings</Typography>
      <List>
        {routes.map((route) => (
          <MenuItem
            button
            key={route.url}
            className={classes.menuItem}
            selected={router.pathname.includes(route.url)}
            component={Link}
            naked
            href={route.url}
          >
            <ListItemText primary={route.name} />
          </MenuItem>
        ))}
      </List>
    </div>
  );
};

export const SettingsMobileSidebar: React.FC = () => {
  const user = useSelector(getUser);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue);
  };

  const router = useRouter();

  const routes = user ? (user.userType === "customer" ? customerSettingsRoutes : merchantSettingsRoutes) : [];

  return (
    <Box>
      <Tabs
        value={router.pathname}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Settings"
      >
        {routes.map((route) => (
          <Tab key={route.name} label={route.name} value={route.url} />
        ))}
      </Tabs>
    </Box>
  );
};
