/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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

export default function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CMSHeader />
      <Container maxWidth="md" className={classes.body}>
        <div className={classes.textSection}>
          <div>
            <Typography className={classes.title} variant="h5">
              FAQ
            </Typography>
            <Typography className="mb-10" component="div">
              SneakQIK is a social shopping deals community that connects deal-seekers and coupon-hunters with brands
              and retailers directly. At SneakQIK you can follow your favorite brands and track their best offers posted
              by them including exclusive coupons and deals you can't find elsewhere. Do you often search for promo
              codes and deals in search engines only to find they don't work? As the offers come directly from the
              horse's mouth at SneakQIK, you can rest assured you will always find working and authentic discounts you
              can trust. All you need to do is search for your favorite store to go to their deals page which lists all
              their authorized offers. But most of all, we want to make them ‘QIK’, which in our world means a quick,
              cracking offer that is short lived and you need to be ready to sneak it. Become a sneaker now!
            </Typography>
            <Typography className={classes.title} variant="h5">
              The Problem
            </Typography>
            <Typography className="mb-10" component="div">
              Deals and coupons are often not worth the effort these days for both shoppers and brands due to the
              following:
              <br />
              <br />
              <ul>
                {" "}
                <li> Coupon misuse and coupon codes that don't work</li>
                <li> Expensive ads which limits margins and discounting</li>
                <li> Offers and deals on social media that don’t reach the shoppers, organically</li>
                <li> Legitimate deals that often sit in shoppers’ email boxes unopened</li>
                <li> Non-incremental sales from blanket deals on brands’ own websites</li>
                <li> Great discounts from small businesses and stores that doesn't easily reach the masses</li>
              </ul>{" "}
              <br />
              <br />
              That’s why we have launched SneakQIK, a social shopping media that connects brands and deal-seekers
              directly with authorized deals. We want to help brands and shoppers get real value from discounts and make
              it worth the effort.
              <br />
              <br />
              <b>For Shoppers - genuine, exclusive deals on shoppers’ favourite brands: </b>
              We want to be the one-stop source for shoppers’ favourite brands, with exclusive coupons, QIK deals, and
              deep discounts offered directly by brands. Our unique business model means that your favourite brands can
              post insane deals and discounts. At SneakQIK, you can track exclusive offers and QIK deals by following
              your favorite brands using our deals feed or you can also search for your favorite store and go to their
              'deals' page directly that lists all their authorized offers.
              <br />
              <br />
              <b>For Brands - your own, self-serve, social 'deals' profile for more effective marketing: </b> Our
              platform gives brands the chance to create their own free social profile for their deals, offers and
              coupons and hyper-target the ideal, deal-seeking audience and convert them into your own deal-followers.
              Build trust and offer authorized deals and SneakQIK members-only discounts in a pre-selected, exclusive
              channel. This eliminates or reduces coupon misuse and also the necessity of offering unnecessary discounts
              to your entire customer base (because not all of your customers will need a deal to buy your product),
              driving incremental sales and protecting your margin.
              <br />
              <br />
              It's a win-win situation for both shoppers and brands.
            </Typography>
          </div>
          <div>
            <Typography className={classes.title} variant="h5">
              Vision
            </Typography>
            <Typography className="mb-10" component="div">
              We want to be the trusted platform of choice for shoppers and deal seekers who are looking for: <br />
              <ul>
                {" "}
                <li>A supportive community of like-minded deal-seekers. </li>
                <li>Exclusive & QIK offers, best-priced products & deep discounts </li>
                <li>Genuine coupons and deals that work </li>
              </ul>
              <br />
              <br />
              We want to work with brands and retailers of all sizes to: <br />
              <ul>
                <li> Help build a social profile for their offers and give full control</li>
                <li> Build an audience of deal-followers who are primed to buy </li>
                <li> Cost-effectively showcase all your offers </li>
                <li> Build brand trust and brand image </li>
                <li> Connect with your chosen deal-followers & social shoppers </li>
              </ul>{" "}
              <br />
              <br />
              These are big promises, but we’re up to the challenge.
              <br />
              <br />
            </Typography>
          </div>
          <div>
            <Typography className={classes.title} variant="h5">
              Who are we?
            </Typography>
            <Typography className="mb-10" component="div">
              SneakQIK is part of Adavenue Media Pty Ltd, one of the leading discount marketing companies in Australia.
              AdAvenue Media also operates one of Australia’s oldest discounts and coupons websites called The Bargain
              Avenue which was launched in 2008. Over the 12 years that we’ve been in the coupons/deals business, we’ve
              driven over $300 million in ecommerce sales revenue for thousands of brands and also helped millions of
              shoppers save millions of dollars. Our websites, deals, and founder have appeared on TV and in news and
              media publications such as Channel 7, News.com.au, Yahoo, Money Magazine Australia, Power Retail, Daily
              Telegraph, CEO Magazine, LifeHacker, TripleM and many more. In 2017, we were also a finalist for the best
              publisher of the year for Rakuten Marketing’s 2017 Golden Link Awards.
              <br />
              <br />
              <div className={classes.image}>
                <img src="images/featured_in.png" />
              </div>
            </Typography>
          </div>
          <div>
            <Typography className={classes.title} variant="h5">
              How does it work?
            </Typography>
            <Typography className="mb-10" component="div">
              We’re revolutionising deals and coupons by connecting brands and shoppers in a new way. Our proprietary
              custom-built shopping platform, all Australian made is designed exclusively for deals and coupons. It’s
              based on a cost-effective model that allows brands to offer genuine, deep discounts and drive their ROI at
              the same time. Here’s what makes us different:
              <br />
              <br />
              <ul>
                <li>Authorized deals and offers directly from brands</li>
                <li>A purpose-built community of deal-seeking shoppers</li>
                <li>The ability for brands to have complete control of their offers and protect margins and ROI</li>
                <li>Deep discounts for shoppers thanks to our cost-effective model</li>
                <li>Support for all kinds of brands, including small businesses affected by COVID-19</li>
              </ul>
              <br />
              <br />
            </Typography>
          </div>
        </div>
      </Container>
      <CMSFooter />
    </div>
  );
}
