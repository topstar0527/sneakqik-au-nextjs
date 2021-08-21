import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import ConnectedBrandCard from "components/shared/ConnectedBrandCard";

const UserProfileFollowingBrandsView = () => {
  const profileState = useSelector((state: any) => state.customer.profile);

  return (
    <div className="mt-6">
      <Grid container spacing={2}>
        {profileState.brands.length > 0 ? (
          profileState.brands.map((brandId) => (
            <Grid item key={brandId} xs={6} sm={4} md={4} lg={3}>
              <ConnectedBrandCard brandId={brandId} />
            </Grid>
          ))
        ) : (
          <div style={{ marginTop: 40, marginBottom: 60, width: "100%" }}>
            <Typography className="mx-3" variant="body1" align="center">
              Make sure you follow brands to keep track of their exclusive coupons, QIK deals and ongoing offers.
            </Typography>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default UserProfileFollowingBrandsView;
