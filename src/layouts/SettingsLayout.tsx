import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import CMSFooter from "components/header/CMSFooter";
import Header from "components/header/Header";
import { SettingsSidebar, SettingsMobileSidebar } from "components/shared/SettingsSidebar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  container: {
    flex: 1,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
}));

const SettingsLayout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Toolbar />

      <Container className={classes.container} maxWidth="lg" style={{ maxWidth: 1174 }}>
        <Grid container>
          <Hidden xsDown>
            <Grid item xs={12} sm={4} md={3}>
              <SettingsSidebar />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={8} md={9} style={{ background: "#F3F3F3" }}>
            <Hidden smUp>
              <SettingsMobileSidebar />
            </Hidden>

            {children}
          </Grid>
        </Grid>
      </Container>

      <CMSFooter />
    </div>
  );
};

export default SettingsLayout;
