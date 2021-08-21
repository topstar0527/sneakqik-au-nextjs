import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import { TabPanel, a11yProps } from "components/core/Tabs";
import CMSFooter from "components/header/CMSFooter";
import CMSHeader from "components/header/CMSHeader";
import PrivacyPolicy from "components/privacy-terms/PrivacyPolicy";
import UserAgreement from "components/privacy-terms/UserAgreement";

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url("/images/shape.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "45%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    textAlign: "center",
    marginTop: 64,
    height: "100%",
  },
  logo: {
    color: "#6E33D4",
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },

  textSection: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  tabWrapper: {
    textAlign: "left",
  },
  tabSection: {
    maxHeight: 400,
    overflow: "auto",

    "&::-webkit-scrollbar": { WebkitAppearance: "none" },
    "&::-webkit-scrollbar:vertical": { width: "11px" },
    "&::-webkit-scrollbar:horizontal": { height: "11px" },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "8px",
      border: "2px solid white",
      backgroundColor: "rgba(0, 0, 0, .5)",
    },
  },
});

export default function PrivacyTerms() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CMSHeader />
      <Container maxWidth="md" className={classes.body}>
        <div className={classes.textSection}>
          <Typography className={classes.title} variant="h5">
            Terms & Privacy
          </Typography>

          <div className={classes.tabWrapper}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="Terms & Privacy"
            >
              <Tab label="Terms and Conditions" {...a11yProps(0)} />
              <Tab label="Privacy Policy" {...a11yProps(1)} />
            </Tabs>
            <div className={classes.tabSection}>
              <TabPanel value={value} index={0}>
                <UserAgreement />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PrivacyPolicy />
              </TabPanel>
            </div>
          </div>
        </div>
      </Container>

      <CMSFooter />
    </div>
  );
}
