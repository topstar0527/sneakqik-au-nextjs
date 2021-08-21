/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Link from "components/core/Link";

import CategoryFilter from "./CategoryFilter";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 18,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  topMenuItem: {
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
  menuTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 16,
    color: "#4A4A4A",
  },
  formControl: {
    width: "100%",
  },
  divider: {
    marginLeft: 22,
    marginRight: 22,
  },
  menuSection: {
    padding: "20px 22px",
  },
  infoBox: {
    paddingLeft: "20px",
    paddingBottom: "0px",
    paddingTop: "22px",
  },
  infoSqik: {
    opacity: ".8",
    padding: "19px",
    fontSize: 12,
    paddingTop: "0px",
  },
}));

export default function LeftSidebarMenu(props) {
  const classes = useStyles();

  const handleView = (text) => {
    props.onViewChange(text.toLowerCase());
  };

  return (
    <div className={classes.root}>
      <List>
        {["Trending", "Following", "Latest"].map((text: string) => (
          <MenuItem
            button
            key={text}
            className={classes.topMenuItem}
            onClick={() => handleView(text)}
            selected={props.view === text.toLowerCase()}
          >
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </List>
      <Divider variant="middle" className={classes.divider} />
      <Box className={classes.menuSection}>
        <CategoryFilter
          cats={props.cats}
          categories={props.categories}
          onCategoryChange={props.onChange}
        ></CategoryFilter>
      </Box>
      <Divider variant="middle" className={classes.divider} />
      <Box className={classes.infoBox}>
        <Typography className={classes.menuTitle}>Connecting Discount-Seekers and Sellers</Typography>
      </Box>
      <Typography className={classes.infoSqik}>
        At SneakQIK you can simply follow and track any brand(new ones added daily) for their best discounts, product
        deals, exclusive offers and non-spam coupons from within your deals-feed and save instantly. Get ready to sneak
        a quick deal, shh!...
        <Link href="/about">more about us</Link>
        <br />
        <br />
        <b>Mobile APP - Coming Soon..</b>
      </Typography>
    </div>
  );
}
