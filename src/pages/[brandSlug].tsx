import React from "react";

import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { NextPageContext, NextPage } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import BrandProfileSection from "components/brand/BrandProfileSection";
import UserBrandOffersSection from "components/brand/UserBrandOffersSection";
import BrandPageLayout from "layouts/BrandPageLayout";
import { getBrandBySlug } from "store/entities/reducer";
import { UserBrand } from "types";
import { generateBrandUrl } from "utils";

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
    backgroundImage: "linear-gradient(14.92deg, #cccccc 10.35%, #ededed 90.88%)",
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

  const brand: UserBrand = useSelector(getBrandBySlug(brandSlug));

  const isFetchingBrandBySlug = useSelector((state: any) => state.customer.home.isFetchingBrandBySlug);

  if (isFetchingBrandBySlug) return null;

  if (!brand && !isFetchingBrandBySlug) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <BrandPageLayout>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{`${brand.name} Discounts, Deals, Coupon & Promo Codes`}</title>
        <meta name="title" content={`${brand.name} Deals, Discounts and Coupons`} />
        <meta
          name="description"
          content={`Find ${brand.name} working discounts and non-spam coupon codes. Follow ${brand.name} to always keep track of their best promos and also be the first to know of any exclusive vouchers and QIK deals when available from ${brand.name}.`}
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={generateBrandUrl(brand.slug)} />
        <meta property="og:title" content={`${brand.name} Deals, Discounts and Coupons`} />
        <meta
          property="og:description"
          content={`Find ${brand.name} working discounts and non-spam coupon codes. Follow ${brand.name} to always keep track of their best promos and also be the first to know of any exclusive vouchers and QIK deals when available from ${brand.name}.`}
        />
        <meta property="og:image" content={brand.headerImage} />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={generateBrandUrl(brand.slug)} />
        <meta name="twitter:title" content={`${brand.name}  Deals, Discounts and Coupons`} />
        <meta
          name="twitter:description"
          content={`Find ${brand.name} working discounts and non-spam coupon codes. Follow ${brand.name} to always keep track of their best promos and also be the first to know of any exclusive vouchers and QIK deals when available from ${brand.name}.`}
        />
        <meta name="twitter:image" content={brand.headerImage} />
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
            <BrandProfileSection brand={brand} />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <UserBrandOffersSection brandName={brand.name} />
          </Grid>
        </Grid>
      </div>
    </BrandPageLayout>
  );
};

export default BrandPage;

BrandPage.getInitialProps = async (ctx: NextPageContext) => {
  const actions = await import("store/customer/home/actions");
  const { loadBrandBySlug, loadOffersByBrandSlug } = actions;

  const { brandSlug } = ctx.query;

  ctx.store.dispatch(loadOffersByBrandSlug(brandSlug));

  ctx.store.dispatch(loadBrandBySlug(brandSlug));

  // ctx.store.dispatch(getBrandsRequest());
};
