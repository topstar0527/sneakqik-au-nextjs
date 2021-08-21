import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector, useDispatch } from "react-redux";

import BrandProfileSection from "components/brand/BrandProfileSection";
import Header from "components/header/Header";
import BrandEditorDialog from "features/BrandEditorDialog";
import actions from "store/merchant/brands/actions";

const useStyles = makeStyles(() => ({
  root: {},

  container: {},

  demo: {
    minHeight: "100vh",
    padding: "24px",
    backgroundColor: "#F3F3F3",
  },
}));

const BrandDraftPage: React.FC = () => {
  const classes = useStyles();

  const draft = useSelector((state: any) => state.merchant.brands.draft.data);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      actions.initDraftEditor({
        open: true,
        closable: false,
      })
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <Toolbar />
      <Container className={classes.container} maxWidth="lg" style={{ maxWidth: 1174 }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={3}>
            <BrandProfileSection brand={draft} />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <div className={classes.demo}>
              <Skeleton variant="rect" animation={false} width={200} height={40} />
              <br />
              <Skeleton variant="rect" animation={false} width={100} height={20} />
            </div>
          </Grid>
        </Grid>
      </Container>
      <BrandEditorDialog />
    </div>
  );
};

export default BrandDraftPage;
