/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

import Link from "components/core/Link";
import CMSFooter from "components/header/CMSFooter";
import CMSHeader from "components/header/CMSHeader";

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url("/images/shape.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "45%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    textAlign: "center",
    marginTop: 64,
  },
  logo: {
    color: "#6E33D4",
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },

  textSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  image: {
    display: "inline-flex",
  },
});

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CMSHeader />
      <Container maxWidth="md" className={classes.body}>
        <div className={classes.textSection}>
          <div>
            <Typography className={classes.title} variant="h5">
              About SneakQIK
            </Typography>
            <Typography className="mb-10" component="div">
              Welcome to the BETA launch of our new social offers platform SneakQIK, that connects discount-seekers and
              sellers. We hope you like us. If you have any feedback you would like to share please{" "}
              <Link href="https://sneakqik.com/contact">contact us here</Link>. We highly value your feedback and
              appreciate your time in helping us improve our product and service to you in the future.
              <br />
              <br />
              <b>For Shoppers, Deal-Seekers & Coupon-Hunters</b>
              <br />
              Using our platform you can simply follow and track any brand(new ones added daily) for their best
              discounts, product deals, exclusive offers and non-spam coupons from within your deals-feed and save
              instantly. Or you can search for your favorite brands and go to their profile pages directly to discover
              all their offers in one place.
              <br />
              <br />
              <b>For Brands, Sellers, Store-Owners & Retailers </b>
              <br />
              Using our easy to manage tool you can create a social deals profile and post all your best deals and
              promotional offers linking directly to your store giving discount-seekers an easy way to discover all your
              offers in one place - from your deals profile page and also our deals newsfeed. You can also take your
              page and use it anywhere you like wherever your deal audience is and build your followers with just one
              link - <Link href="#">sneakQIK.com/your_brand_name</Link> helping you hyper-target your best bargains and
              convert better.{" "}
              <Link href="https://sneakqik.com/business/forbusinesses.html">Businesses - join us here.</Link>
              <br />
              <br />
              <b>Real discounts(no spam)</b>
              <br />
              Love hunting for coupons in search engines and finding an amazing discount? What about the moment you
              enter the code in the cart and the site spits out some weird error messages? Your built up excitement gone
              just in a matter of seconds! Sad to say, when it comes to coupon codes shoppers are only third time lucky.
              We want to change this familiar, frustrating shopping experience. At SneakQIK, we believe that the future
              of coupons and deals should be tidy and clean and worth every effort for brands and shoppers. We believe
              that by giving control and putting brands in the driver's seat and making their offers come straight from
              the horse's mouth direct to the shoppers, we can create a trustworthy, credible and reliable deals and
              coupons site. We not only strive to keep it clean but also have the best bargains including exclusive
              offers. And most of all, want to make them ‘QIK’, as in our world, a cracking offer will have to be quick
              and short lived. You just need to join us and become a sneaker, to sneak a quick deal from your favorite
              brand.
            </Typography>
          </div>
          <div>
            <Typography className={classes.title} variant="h5">
              Vision
            </Typography>
            <Typography className="mb-10" component="div">
              We want to be the trusted platform of choice for deal-seekers/coupon-hunters and
              brands/sellers/merchants/retailers of all sizes - big to small(all welcome), helping get the most value
              from best offers and exclusive deals.
            </Typography>
          </div>
          <div>
            <Typography className={classes.title} variant="h5">
              Who are we?
            </Typography>
            <Typography className="mb-10" component="div">
              SneakQIK is part of Adavenue Media Pty Ltd, one of the leading discount marketing companies in Australia.
              AdAvenue Media also operates one of Australia’s oldest discounts and coupons websites called The Bargain
              Avenue which was launched in 2008, and has now been merged with SneakQIK. With SneakQIK we're focussed on
              a new strategy to help shoppers and brands get the most value from offers and coupons by addressing many
              pain points. Over the past 12 years, ADavenue has driven over $300 million in ecommerce sales revenue for
              thousands of partnered brands and also helped millions of shoppers save millions of dollars. Our websites,
              deals, and founder have appeared on TV and in news and media publications such as Channel 7, News.com.au,
              Yahoo, Money Magazine Australia, Power Retail, Daily Telegraph, CEO Magazine, LifeHacker, TripleM and many
              more. In 2017, we were also a finalist for the best publisher of the year for Rakuten Marketing’s 2017
              Golden Link Awards.
              <br />
              <br />
              <div className={classes.image}>
                {/* <img src="images/featured_in.png" /> */}
                <Image src="/images/featured_in.png" layout="fixed" width={200} height={93} />
              </div>
            </Typography>
          </div>
        </div>
      </Container>
      <CMSFooter />
    </div>
  );
}
