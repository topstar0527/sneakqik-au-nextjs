import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { useSelector, useDispatch } from "react-redux";

import CMSFooter from "components/header/CMSFooter";
import Header from "components/header/Header";
import { authActions } from "store/auth/actions";

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

const BrandPageLayout: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const [intentModalShown, setIntentModalShown] = useState(false);

  const handleIntentModal = () => {
    if (!authState.user && !intentModalShown) {
      setIntentModalShown(true);
      dispatch(authActions.showIntentModal());
    }
  };

  return (
    <div className={classes.root} onMouseLeave={handleIntentModal}>
      <Header />
      <Toolbar />

      <Container className={classes.container} maxWidth="lg" style={{ maxWidth: 1174 }}>
        <>{props?.children}</>
      </Container>

      <CMSFooter />
    </div>
  );
};

export default BrandPageLayout;
