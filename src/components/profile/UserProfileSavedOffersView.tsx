import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import UserOfferControlMenu from "components/brand/UserOfferControlMenu";
import ConnectedUserOfferCard from "components/shared/ConnectedUserOfferCard";
import { OfferBase } from "types";

const UserProfileSavedOffersView = () => {
  const profileState = useSelector((state: any) => state.customer.profile);

  //
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [slug, setSlug] = React.useState<string>("");

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>, o: OfferBase) => {
    setAnchorEl(event.currentTarget);
    setSlug(o.slug);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSlug("");
  };

  return (
    <div className="mt-6">
      <Grid container spacing={2}>
        {profileState.offers.saved.length > 0 ? (
          profileState.offers.saved.map((offerSlug) => (
            <Grid item key={offerSlug} xs={12} sm={6} md={4} lg={4}>
              <ConnectedUserOfferCard slug={offerSlug} onMoreClick={handleMoreClick} />
            </Grid>
          ))
        ) : (
          <div style={{ marginTop: 40, marginBottom: 60, width: "100%" }}>
            <Typography className="mx-3" variant="body1" align="center">
              No saved offers.
            </Typography>
          </div>
        )}
      </Grid>

      <UserOfferControlMenu anchorEl={anchorEl} slug={slug} onClose={handleClose} />
    </div>
  );
};

export default UserProfileSavedOffersView;
