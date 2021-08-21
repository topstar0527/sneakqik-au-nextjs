/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Head from "next/head";
import { useDispatch } from "react-redux";

import AuthenticationForm from "features/AuthenticationForm";
import { authActions } from "store/auth/actions";

export default function foruser() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    (function () {
      const a = document.createElement("script");
      a.async = true;
      a.src = "/src.85becb8b.js";
      const s = document.getElementsByTagName("script")[0];
      s?.parentNode?.insertBefore(a, s);
    })();
  }, []);

  React.useEffect(() => {
    dispatch(authActions.showUserRegisterForm());
  });

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet" />
        <link type="text/css" rel="stylesheet" href="/main.5612ccb5.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta charSet="utf-8" />
        <title>Sign Up at SneakQIK, a social network for deals.</title>

        <meta
          name="description"
          content="Follow your favorite brands. Track and save extra from exclusive & QIK deals you can't find elsewhere, posted by brands themselves."
        />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Sign Up at SneakQIK, a social network for deals." />
        <meta property="og:url" content="https://staging.sneakqik.com/foruser" />
        <meta property="og:site_name" content="Sign Up at SneakQIK, a social network for deals." />

        <meta property="og:image" content="https://sneakqik.com/images/ogimage.png" />
        <meta property="og:image:width" content="250" />
        <meta property="og:image:height" content="250" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sneakqik.com/images/ogimage.png" />
        <meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1" />
      </Head>

      <div>
        <div className="panel panel--1 panel--light-purple">
          <div className="container">
            <div className="header">
              <div className="header__logo">
                <a href="https://sneakqik.com/">
                  <img src="/logo.gif" width="100px" height="21px" alt="SneakQIK" />
                </a>
              </div>
              <div className="header__links">
                <a href="https://sneakqik.com/" style={{ textDecoration: "none" }}>
                  Explore
                </a>{" "}
                &nbsp;&nbsp;
                <a href="https://sneakqik.com/merchant/login" className="header__join-link">
                  Login
                </a>
                {/* <a href="#why" class="header__login-link">Why?</a><a href="#about" class="header__login-link">About</a>   */}
              </div>
            </div>
            <div className="panel__content panel__content--top">
              <div className="panel__content-col panel__content-col--small panel__content-col--big-height">
                <div className="table" style={{ display: "flex" }}>
                  <div className="table__row">
                    <div className="table__row-col table__row-col--card purplecard">&nbsp;</div>
                    <div className="table__row-col">
                      <img src="/images/offer_dsdd2.png" alt="footer 1" />
                    </div>
                  </div>
                  <div className="table__row">
                    <div className="table__row-col">
                      <img src="/images/offer_kjwdiud2.png" alt="footer 2" />
                    </div>
                    <div className="table__row-col table__row-col--card cards">
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel__content-col panel__content-col--big" data-scrollwiz="start">
                <div className="panel__content-col-title" style={{ fontSize: "30px" }}>
                  A Social Media for Shopping and Deals
                </div>
                <div className="panel__content-col-text" style={{ marginBottom: "20px" }}>
                  Shh! Find{" "}
                  <span style={{ fontWeight: "bold", color: "#6E33D4" }}>secret coupons, exclusive & QIK deals </span>
                  posted by brands you can't find elsewhere. Follow your favourite stores and save extra!
                </div>
                <div style={{ background: "white", padding: "20px" }}>
                  <AuthenticationForm />
                </div>
                {/* <div
                  className="panel__content-col-title"
                  style={{
                    background: "linear-gradient(90deg, #6e33d4 0%, #47cdd1 99.58%)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Give Your Deals &amp; Your Loyal Deal-Seekers The Home They Deserve.
                </div>
                <div className="panel__content-col-text" style={{ marginBottom: "0px !important" }}>
                  Be a part of the next-generation social media network exclusively dedicated to deals and offers. Our
                  revolutionary platform*, Australian made, built on our proprietary technology, helps you create a
                  dedicated, targeted, controlled social profile for all your offers and build your own ideal audience
                  of loyal deal-followers who can easily track all your genuine deals and discounts in one page and one
                  place. Drive incremental sales and increase your ROI on your offers.
                </div>
                <br />
                <div className="panel__content-col-button">
                  <a href="#join" className="button">
                    Get Your Social 'Deals' Profile
                  </a>{" "}
                  <br />* Mobile app is coming soon.
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel--7 panel--light-green">
          <div className="container">
            <div className="panel__content panel__content--no-height panel__content--footer">
              <div className="panel__content-col panel__content-col--small" data-scrollwiz="start">
                <div className="form">
                  <div className="form__title" />
                  <div className="form__address">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <b>Tired of searching for coupons only to find they are a scam and don't work? We can help.</b>
                    <br />
                    Coupon fraud and fake coupons hurt shoppers and brands. They can also infect computers and steal
                    your information and identity. That’s why we have launched SneakQIK, a social media made exclusively
                    for deals, where you can find only the authorized offers posted by brands themselves all in one
                    place, including exclusive coupons and QIK deals you can't find elsewhere. With the offers coming
                    directly from the horse's mouth you can be rest assured you find real, authentic and working offers
                    you can trust. At SneakQIK, you can track offers for brands you follow using our deals feed, or
                    search for your favorite store and go to their social deals page that lists all their ongoing
                    offers..<a href="https://sneakqik.com/about">more</a>
                    <br />
                    <br />
                    <img src="/images/clientlogos.png" />
                  </div>
                </div>
              </div>
              <div className="panel__content-col panel__content-col--big" data-scrollwiz="start">
                <div className="footer">
                  <div className="footer-col">
                    <div className="footer-col__title" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <ul>
                      <li>
                        <a href="https://sneakqik.com/">Explore</a>
                      </li>
                      <li>
                        <a href="https://sneakqik.com/about">About SneakQIK</a>
                      </li>
                      <li>
                        <a href="https://sneakqik.com/business/forbusinesses.html">For Businesses</a>
                      </li>
                      <li>
                        <a href="https://sneakqik.com/contact ">Contact Us</a>
                      </li>
                      <li>
                        <a href="https://sneakqik.com/privacy-terms">Terms &amp; Privacy</a>
                      </li>
                      <li>© SneakQIK.com 2021 ABN:76 160 237 525</li>
                    </ul>
                  </div>
                  <div className="footer-col">
                    <div className="footer-col__title" />
                    <ul>
                      <li />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
