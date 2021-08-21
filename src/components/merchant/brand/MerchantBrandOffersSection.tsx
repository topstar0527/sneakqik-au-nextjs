/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { a11yProps, TabPanel } from "components/core/Tabs";
import ConnectedMerchantOfferCard from "components/shared/ConnectedMerchantOfferCard";
import { getBrandBySlug, getOffers } from "store/entities/reducer";
import { OfferBase, MerchantBrand } from "types";
import { byCreatedAt } from "utils";

import MerchantOfferControlMenu from "./MerchantOfferControlMenu";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100%",
    padding: "24px",
    backgroundColor: "#FAFAFA",

    [theme.breakpoints.down("xs")]: {
      minHeight: "inherit",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 23,
  },
  label: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "19px",
    color: "#4A4A4A",
  },
  cardContainer: {
    paddingTop: "24px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 27,
  },
  featuredContainer: {
    border: "solid 1px #e0e0e0",
    borderRadius: 18,
    paddingBottom: 10,
    marginBottom: 20,
  },
  noOffer: {
    marginTop: 40,
    marginBottom: 120,
  },
}));

const MerchantBrandOffersSection = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const router = useRouter();

  const { brandSlug } = router.query;

  const brand: MerchantBrand = useSelector(getBrandBySlug(brandSlug));

  const offerSlugs = useSelector((state: any) => state.merchant.brands.offers);

  const offers: OfferBase[] = useSelector(getOffers(offerSlugs));

  const publishedOffers = offers.filter((offer) => offer.status === "published").sort(byCreatedAt);

  const draftOffers = offers.filter((offer) => offer.status === "draft").sort(byCreatedAt);

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
    <div className={classes.root}>
      {brand.name ? (
        <Typography className={classes.title}>{`${brand.name} Deals, Offers and Discounts`}</Typography>
      ) : (
        <Skeleton variant="rect" className={classes.title} height={16} />
      )}

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="OFFERS" {...a11yProps(0)} />
        <Tab label="DRAFT" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {publishedOffers.length === 0 ? (
          <div className={classes.noOffer}>
            <Typography variant="body1" align="center">
              Please click on the + button above to post your very first offer. Add all your best offers, coupon codes
              and product deals to make your page look complete for best results. Exclusive offers and QIK Deals will
              get better engagements. The offers you add will show in the dealsfeed and also on your social 'deals'
              profile page (your page link on SneakQIK as shoppers see is given in the bottom of your bio). Use it
              anywhere you like. You can share it to grow your 'deal-seeker' followers to your page, to let them track
              all your ongoing and exclusive deals in one page and place. Remember to stay active on the platform by
              offering deals and coupons regularly.
            </Typography>
          </div>
        ) : (
          <div className={classes.cardContainer}>
            {publishedOffers.filter((item) => item.isFeatured).length > 0 && (
              <Grid container spacing={2} className={classes.featuredContainer}>
                <Grid item xs={12} style={{ paddingBottom: 0, paddingLeft: 10, paddingTop: 10 }}>
                  <Typography display="block" className={classes.label}>
                    Featured offers
                  </Typography>
                </Grid>

                {publishedOffers
                  .filter((item) => item.isFeatured)
                  .map((offer: OfferBase) => (
                    <Grid item key={offer.slug} xs={12} sm={6} md={4} lg={3}>
                      <ConnectedMerchantOfferCard key={offer.id} slug={offer.slug} onMoreClick={handleMoreClick} />
                    </Grid>
                  ))}
              </Grid>
            )}
            <Grid container spacing={2}>
              {publishedOffers
                .filter((item) => !item.isFeatured)
                .map((offer: OfferBase) => (
                  <Grid item key={offer.slug} xs={12} sm={6} md={4} lg={3}>
                    <ConnectedMerchantOfferCard key={offer.id} slug={offer.slug} onMoreClick={handleMoreClick} />
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {draftOffers.length === 0 ? (
          <div className={classes.noOffer}>
            <Typography variant="body1" align="center">
              No offers yet
            </Typography>
          </div>
        ) : (
          <div className={classes.cardContainer}>
            <Grid container spacing={2}>
              {draftOffers.map((offer) => (
                <Grid item key={offer.id} xs={12} sm={6} md={4} lg={4}>
                  <ConnectedMerchantOfferCard key={offer.id} slug={offer.slug} onMoreClick={handleMoreClick} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </TabPanel>

      <MerchantOfferControlMenu slug={slug} anchorEl={anchorEl} onClose={handleClose} />
    </div>
  );
};

export default MerchantBrandOffersSection;
