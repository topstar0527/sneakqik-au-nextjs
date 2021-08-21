import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import UserOfferControlMenu from "components/brand/UserOfferControlMenu";
import ConnectedUserOfferCard from "components/shared/ConnectedUserOfferCard";
import { getOffersObjectsByBrandSlug } from "store/entities/reducer";
import { OfferBase } from "types";
import { byCreatedAt } from "utils";

const useStyles = makeStyles({
  root: {
    minHeight: "100%",
    padding: "24px",
    backgroundColor: "#FAFAFA",
  },

  title: {
    fontSize: 20,
    marginTop: 7,
    marginBottom: 23,
  },
  label: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "19px",
    color: "#4A4A4A",
  },

  noOffer: {
    marginTop: 40,
  },

  featuredContainer: {
    border: "solid 1px #e0e0e0",
    borderRadius: 18,
    paddingBottom: 10,
    marginBottom: 20,
  },
});

type Props = {
  brandName: string;
};

const UserBrandOffersSection: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { brandName } = props;

  const router = useRouter();

  const { brandSlug } = router.query;

  const offers = useSelector(getOffersObjectsByBrandSlug(brandSlug));

  const isOffersFetching = useSelector((state: any) => state.customer.home.isOffersFetching);

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

  const offersFeatured: OfferBase[] = [];
  const offersNonFeatured: OfferBase[] = [];
  const offersExpiredFeatured: OfferBase[] = [];
  const offersExpiredNonFeatured: OfferBase[] = [];

  offers.sort(byCreatedAt).map((offer: any) => {
    // Separate into two groups: `offersFeatured` and `offersNonFeatured`
    if (new Date(offer.expireDate) < new Date()) {
      if (offer.isFeatured) {
        offersExpiredFeatured.push(offer);
      } else {
        offersExpiredNonFeatured.push(offer);
      }
    } else if (offer.isFeatured) {
      offersFeatured.push(offer);
    } else {
      offersNonFeatured.push(offer);
    }
  });

  const offersOrdered: OfferBase[] = offersFeatured
    .concat(offersNonFeatured)
    .concat(offersExpiredFeatured)
    .concat(offersExpiredNonFeatured);

  return (
    <div className={classes.root}>
      <Typography>
        <h1 className={classes.title}> {`${brandName} Deals, Discounts and Coupons`}</h1>
      </Typography>

      <div className="mb-6">
        {isOffersFetching ? (
          <CircularProgress />
        ) : offersOrdered.length === 0 ? (
          <Typography variant="body1" align="center">
            {`${brandName} hasn't added any offers yet. Follow ${brandName} and be the first to
              know when ${brandName} adds any exclusive deals and coupons.`}
          </Typography>
        ) : (
          <>
            <Typography variant="body1">
              <b>{`Follow ${brandName} at SneakQIK - `} </b>{" "}
              {`Track exclusive coupon codes and best offers from ${brandName} within your newsfeed. Get ready to sneak a quick deal from ${brandName}!`}{" "}
              <br />
              <br />
            </Typography>
            <Grid container spacing={2}>
              {offersOrdered.map((offer: OfferBase) => (
                <Grid item key={offer.slug} xs={6} sm={6} md={4} lg={3}>
                  <ConnectedUserOfferCard slug={offer.slug} hasPostByLabel={false} onMoreClick={handleMoreClick} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>

      <UserOfferControlMenu anchorEl={anchorEl} slug={slug} onClose={handleClose} />
    </div>
  );
};

export default UserBrandOffersSection;
