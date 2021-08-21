/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "lodash";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import useSWR from "swr";

import API from "api";
import BrandSuggestionSection from "components/brand/BrandSuggestionSection";
import UserOfferControlMenu from "components/brand/UserOfferControlMenu";
import { a11yProps } from "components/core/Tabs";
import FilterSection from "components/FilterSection";
import Header from "components/header/Header";
import ConnectedOfferPost from "components/shared/ConnectedOfferPost";
import ConnectedUserOfferCard from "components/shared/ConnectedUserOfferCard";
import CreateOfferPost from "components/shared/CreateOfferPost";
import CategoryMobile from "components/shared/home/CategoryMobile";
import LeftSidebarMenu from "components/shared/home/LeftSidebarMenu";
import SneakSlider from "components/shared/SneakSlider";
import actions from "store/actions";
import { authActions } from "store/auth/actions";
import { getSelectedBrand } from "store/auth/reducer";
import * as homeActions from "store/customer/home/actions";
import { getFeedOffers, getFeedFetchingStatus } from "store/customer/home/reducer";
import { OfferBase } from "types";
import { extractQuery } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  container: {
    maxWidth: "1126px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
  },

  label: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "19px",
    color: "#4A4A4A",
    marginBottom: 4,
    marginTop: 12,
  },

  rightSidebar: {
    position: "sticky",
    top: "64px",
    width: "276px",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  leftSidebar: {
    position: "sticky",
    top: "64px",
    width: "280px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  content: {
    display: "flex",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#f5f5f5",
    flexDirection: "column",
    width: "584px",
    minHeight: "calc(100vh - 66px)",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  section: {
    position: "unset",
    top: 66,
    zIndex: 1,
    background: "#f5f5f5",
    width: "calc(100% + 16px)",
    marginLeft: -8,
    paddingLeft: 8,
    paddingRight: 8,

    [theme.breakpoints.down("sm")]: {
      top: 58,
    },
  },

  card: {
    marginTop: 18,
    marginBottom: 18,

    [theme.breakpoints.down("sm")]: {
      marginTop: 16,
      marginBottom: 16,
    },
  },

  offerCard: {
    width: 170,
    // height: 308,
    marginBottom: 10,
  },

  tabs: {
    minHeight: 36,
    marginTop: 12,
  },

  tab: {
    minHeight: 36,
    textTransform: "capitalize",
  },
  chip: {
    color: "rgba(74, 74, 74, 0.6)",
    "&.selected": {
      background: "#6E33D4",
      color: "#ffffff",
      fontWeight: "bold",
    },
    height: 24,
    fontSize: 14,
    margin: 1,
  },
}));

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function HomePage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const offers = useSelector(getFeedOffers);

  const isFetching = useSelector(getFeedFetchingStatus);

  const router = useRouter();

  const query = extractQuery(router.query);

  const { data: cats = [] } = useSWR("/categories/", fetcher);
  const catsSelected = cats.filter((item) => query.category && query.category.includes(item.id));

  const loadMoreContent = (index: number, _: Waypoint.CallbackArgs) => {
    dispatch(homeActions.loadMoreOffers({ index, query }));
  };

  const handleCategoryChange = React.useCallback(
    (c: string[]) => {
      const q = {
        ...query,
        category: c,
      };
      router.push({ pathname: "/", query: q }, undefined);
    },
    [query]
  );

  const handleTypeChange = React.useCallback(
    (t: string) => {
      const q = {
        ...query,
        type: t,
      };
      router.push({ pathname: "/", query: q }, undefined);
    },
    [query]
  );

  const handleViewChange = React.useCallback(
    (v: string) => {
      const q = {
        ...query,
        view: v,
      };
      router.push({ pathname: "/", query: q }, undefined);
    },
    [query]
  );

  const [tabValue, setTabValue] = React.useState("trending");

  const user = useSelector((state: any) => state.auth.user);

  const handleTabChange = (v: string) => {
    if (v !== "category") {
      if (!user && (v.toLowerCase() === "following" || v.toLowerCase() === "latest")) {
        dispatch(authActions.showUserLoginForm());
      } else {
        setTabValue(v);
        handleViewChange(v);
      }
    } else {
      setTabValue(v);
    }
  };

  React.useEffect(() => {
    if (!user && (query.view === "following" || query.view === "latest")) {
      handleViewChange("trending");
    }
  }, [user, query.view]);

  const handleWindowResize = () => {
    if (window.innerWidth >= 960 && tabValue === "category") {
      setTabValue(query.view || "");
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const selectedBrand = useSelector(getSelectedBrand);

  const todayOffers = useSelector((state: any) => state.customer.home.todayOffers);

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
    <div>
      <Head>
        <title>
          SneakQIK.com | A social offers platform helping shoppers, deal-seekers and coupon hunters find best offers and
          non-spam coupons, including exclusive discounts, promo codes and flash deals, direct from their favorite
          brands. Get ready to sneak a quick deal. Shh!
        </title>

        {/* <!-- Primary Meta Tags --> */}
        <meta
          name="title"
          content="SneakQIK.com | A social offers platform helping shoppers, deal-seekers and coupon hunters find best offers and non-spam coupons, including exclusive discounts, promo codes and flash deals, direct from their favorite brands. Get ready to sneak a quick deal. Shh!"
        />
        <meta
          name="description"
          content="Search for/follow any brand and track all their best deals and limited time special promotions from within your deals-feed including exclusive coupons and QIK flash deals you can't find elsewhere."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SneakQIK.com | A social offers platform helping shoppers, deal-seekers and coupon hunters find best offers and non-spam coupons, including exclusive discounts, promo codes and flash deals, direct from their favorite brands. Get ready to sneak a quick deal. Shh!"
        />
        <meta
          property="og:description"
          content="Search for/follow any brand and track all their best deals and limited time special promotions from within your deals-feed including exclusive coupons and QIK flash deals you can't find elsewhere."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:site_name" content="SneakQIK" />
        <meta property="og:image" content="/images/ogimage.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="333" />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta
          name="twitter:title"
          content="SneakQIK.com | A social offers platform helping shoppers, deal-seekers and coupon hunters find best offers and non-spam coupons, including exclusive discounts, promo codes and flash deals, direct from their favorite brands. Get ready to sneak a quick deal. Shh!"
        />
        <meta
          name="twitter:description"
          content="Search for/follow any brand and track all their best deals and limited time special promotions from within your deals-feed including exclusive coupons and QIK flash deals you can't find elsewhere."
        />
        <meta name="twitter:image" content="/images/ogimage.png" />
      </Head>

      <Header />
      <Toolbar />

      <main className={clsx(classes.container, classes.root)}>
        <aside className={classes.leftSidebar}>
          <LeftSidebarMenu
            cats={cats}
            categories={query.category}
            onChange={handleCategoryChange}
            view={query.view}
            onViewChange={handleTabChange}
          />
        </aside>

        <main className={classes.content}>
          {tabValue !== "category" && todayOffers && todayOffers.length > 0 && (
            <>
              <SneakSlider className="my-2" label="Top QIK Deals & Exclusives">
                {todayOffers.map((slug) => (
                  <ConnectedUserOfferCard
                    className={classes.offerCard}
                    key={slug}
                    slug={slug}
                    showLogo={true}
                    hasPostByLabel={false}
                    hasOverlay={true}
                    onMoreClick={handleMoreClick}
                  />
                ))}
              </SneakSlider>
              <Divider className="mt-4" />
            </>
          )}

          <div className={classes.section}>
            <Typography className={classes.label}>
              Welcome to the BETA launch of our new social offers platform, SneakQIK. Get ready to sneak a quick deal,
              shh!
            </Typography>

            <Hidden mdUp>
              <div className="my-3">
                {catsSelected.map((category: Category, index: number) => (
                  <Chip key={index} size="small" className={clsx(classes.chip, "selected")} label={category.name} />
                ))}
                {catsSelected.length > 0 && (
                  <Chip
                    size="small"
                    className={classes.chip}
                    label="Clear all"
                    clickable
                    onClick={() => handleCategoryChange([])}
                    onDelete={() => handleCategoryChange([])}
                  />
                )}
              </div>
            </Hidden>

            <Hidden mdUp>
              <Tabs
                value={tabValue}
                onChange={(_, v) => handleTabChange(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                scrollButtons="auto"
                aria-label="view-tabs"
                className={classes.tabs}
              >
                <Tab className={classes.tab} value="trending" label="Trending" {...a11yProps(0)} />
                <Tab className={classes.tab} value="following" label="Following" {...a11yProps(1)} />
                <Tab className={classes.tab} value="latest" label="Latest" {...a11yProps(2)} />
                <Tab className={classes.tab} value="category" label="All Categories" {...a11yProps(3)} />
              </Tabs>
            </Hidden>

            {tabValue === "category" && (
              <Hidden mdUp>
                <div>
                  <CategoryMobile categories={query.category || []} onChange={handleCategoryChange} />
                </div>
              </Hidden>
            )}

            {tabValue !== "category" && (
              <FilterSection
                // onPeriodChange={handlePeriodChange}
                onTypeChange={handleTypeChange}
                type={query.type as string}
              />
            )}
          </div>
          {tabValue !== "category" && (
            <div>
              {!_.isEmpty(selectedBrand) && (
                <CreateOfferPost
                  brand={selectedBrand}
                  onCreate={() => {
                    dispatch(actions.merchant.brands.createOffer());
                  }}
                />
              )}
              {query.view === "following" && offers.length < 1 ? (
                <div style={{ marginTop: 40, marginBottom: 60, width: "100%" }}>
                  <Typography className="mx-3" variant="body1" align="center">
                    Make sure you follow brands to keep track of their exclusive coupons and QIK deals.
                  </Typography>
                </div>
              ) : (
                offers.map((slug, idx) => (
                  <React.Fragment key={slug}>
                    <ConnectedOfferPost className={classes.card} slug={slug} />

                    <Waypoint onEnter={(args) => loadMoreContent(idx, args)} bottomOffset={-5} />
                  </React.Fragment>
                ))
              )}
              <div className="flex items-center justify-center">{isFetching && <CircularProgress />}</div>
            </div>
          )}
        </main>

        <aside className={classes.rightSidebar}>
          <BrandSuggestionSection />
        </aside>
      </main>

      <UserOfferControlMenu anchorEl={anchorEl} slug={slug} onClose={handleClose} />
    </div>
  );
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const query = extractQuery(ctx.query);

  ctx.store.dispatch(homeActions.getTodayQIKOffersRequest());

  ctx.store.dispatch(homeActions.loadFeed(query));

  ctx.store.dispatch(homeActions.getBrandsRequest());
};
