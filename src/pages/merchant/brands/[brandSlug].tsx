import React from "react";

import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import MerchantBrandOffersSection from "components/merchant/brand/MerchantBrandOffersSection";
import MerchantBrandProfileSection from "components/merchant/brand/MerchantBrandProfileSection";
import MerchantOfferViewerDialog from "features/MerchantOfferViewerDialog";
import BrandPageLayout from "layouts/BrandPageLayout";
import { getBrandBySlug } from "store/entities/reducer";
import actions from "store/merchant/brands/actions";
import { MerchantBrand } from "types";

const chargebeeSite = process.env.NEXT_PUBLIC_CHARGEBEE_SITE;

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    padding: "calc(50% * 1 / 6) 50%",
    backgroundImage: "linear-gradient(14.92deg, #6E33D4 10.35%, #9162E1 90.88%)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  },
}));

const BrandPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const { brandSlug } = router.query;

  const dispatch = useDispatch();

  const brand: MerchantBrand = useSelector(getBrandBySlug(brandSlug));

  if (!brand) {
    return <DefaultErrorPage statusCode={404} />;
  }

  React.useEffect(() => {
    if (brand.id) dispatch(actions.getOffersRequest({ brandId: brand.id }));
  }, [brand.id]);

  return (
    <BrandPageLayout>
      <Head>
        <title>{brand.name}</title>
        <script src="https://js.chargebee.com/v2/chargebee.js" data-cb-site={chargebeeSite}></script>
      </Head>

      <div className={classes.root}>
        {/* {brand.plan !== "basic" && <CardMedia className={classes.media} image={brand.headerImage} title={brand.name} />} */}
        {brand.plan !== "basic" && (
          <CardMedia className={classes.media} title={brand.name}>
            <Image src={brand.headerImage} layout="fill" objectFit="cover" />
          </CardMedia>
        )}

        <Grid container className={classes.container}>
          <Grid item xs={12} sm={4} md={3}>
            <MerchantBrandProfileSection brand={brand} />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <MerchantBrandOffersSection />
          </Grid>
        </Grid>
      </div>

      <MerchantOfferViewerDialog />
    </BrandPageLayout>
  );
};

export default BrandPage;
