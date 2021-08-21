import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { NextPage, NextPageContext } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Header from "components/header/Header";
import ConnectedOfferViewer from "components/shared/ConnectedOfferViewer";
import { loadOfferBySlug } from "store/customer/home/actions";
import { getOfferBySlug, getBrandBySlug } from "store/entities/reducer";
import { generateOfferUrl } from "utils";

const useStyles = makeStyles(() => ({
  root: {},
  container: {},
}));

const OfferPage: NextPage = () => {
  const classes = useStyles();

  const router = useRouter();

  const { offerSlug } = router.query;

  const offer = useSelector(getOfferBySlug(offerSlug));
  const brand = useSelector(getBrandBySlug(offer?.brand));

  const isFetchingOfferBySlug = useSelector((state: any) => state.customer.home.isFetchingOfferBySlug);

  if (!offer && !isFetchingOfferBySlug) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (isFetchingOfferBySlug) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{`${offer.title} at ${brand.name}`}</title>
        <meta name="title" content={`${offer.title} at ${brand.name}`} />
        <meta name="description" content={offer.description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={generateOfferUrl(offer.slug)} />
        <meta property="og:title" content={`${offer.title} at ${brand.name}`} />
        <meta property="og:description" content={offer.description} />
        <meta property="og:image" content={offer.image} />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={generateOfferUrl(offer.slug)} />
        <meta name="twitter:title" content={`${offer.title} at ${brand.name}`} />
        <meta name="twitter:description" content={offer.description} />
        <meta name="twitter:image" content={offer.image} />
      </Head>

      <Header />
      <Toolbar />

      <Container className={classes.container} maxWidth="lg" style={{ maxWidth: 1174 }}>
        <div className="my-8">
          <ConnectedOfferViewer slug={offerSlug as string} />
        </div>
      </Container>
    </div>
  );
};

OfferPage.getInitialProps = async (ctx: NextPageContext) => {
  const { offerSlug } = ctx.query;
  ctx.store.dispatch(loadOfferBySlug(offerSlug));
};

export default OfferPage;
