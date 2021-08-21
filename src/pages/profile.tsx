import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextPageContext, NextPage } from "next";
import { useSelector } from "react-redux";

import BrandSuggestionSection from "components/brand/BrandSuggestionSection";
import { TabPanel, a11yProps } from "components/core/Tabs";
import Header from "components/header/Header";
import UserProfileFollowingBrandsView from "components/profile/UserProfileFollowingBrandsView";
import UserProfileLikedOffersView from "components/profile/UserProfileLikedOffersView";
import UserProfileSavedOffersView from "components/profile/UserProfileSavedOffersView";
import UserProfileSection from "components/profile/UserProfileSection";
import actions from "store/actions";
import { getBrandsRequest } from "store/customer/home/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },

  content: {
    display: "flex",
    padding: "18px",
    backgroundColor: "#f5f5f5",
    flexDirection: "column",

    [theme.breakpoints.up("md")]: {
      minHeight: "calc(100vh - 66px)",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 10,
  },

  tabs: {
    borderBottom: "1px solid rgb(0,0,0,0.1)",
  },

  tab: {
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      textTransform: "capitalize",
    },
  },
}));

const Profile: NextPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const user = useSelector((state: any) => state.auth.user) || {};

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Header />
      <Toolbar />

      <Container className={classes.container} maxWidth="lg" style={{ maxWidth: 1174 }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={3}>
            <UserProfileSection />
          </Grid>

          <Grid item xs={12} sm={8} md={6}>
            <main className={classes.content}>
              <Typography className={classes.title}>{`${user.username}'s Activity`}</Typography>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant={isMobile ? "standard" : "fullWidth"}
                aria-label="activity tabs"
              >
                <Tab className={classes.tab} label="Following Brands" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Liked Offers" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Saved Offers" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <UserProfileFollowingBrandsView />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserProfileLikedOffersView />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <UserProfileSavedOffersView />
              </TabPanel>
            </main>
          </Grid>

          <Grid item sm={12} md={3}>
            <BrandSuggestionSection />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;

Profile.getInitialProps = async (ctx: NextPageContext) => {
  const dispatch = ctx.store.dispatch;

  dispatch(actions.customer.profile.getOffersLiked());

  dispatch(actions.customer.profile.getOffersSaved());

  dispatch(actions.customer.profile.getBrandsFollowing());

  dispatch(getBrandsRequest());
};
