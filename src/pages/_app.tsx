import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { AppContext, AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import qs from "qs";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";

import analytics from "api/analytics";
import Authorization from "components/Authorization";
import { authActions } from "store/actions";
import { shareOffer } from "store/entities/actions";
import {
  closeEditOfferDialog,
  closeNewOfferDialog,
  closeUpgradeDialog,
  merchantCloseViewOfferDialog,
} from "store/offers/actions";
import { wrapper } from "store/store";
import { closeContactUsDialog } from "store/support/actions";
import { stripQueryStringAndHashFromPath } from "utils";
// import "styles/index.css";
import "tailwindcss/tailwind.css";

import theme from "../theme";

// import SneakQIKMessage from "components/shared/SneakQIKMessage";
const SneakQIKMessage = dynamic(() => import("components/shared/SneakQIKMessage"), { ssr: false });
// import ContactUsDialog from "features/ContactUsDialog";
const ContactUsDialog = dynamic(() => import("features/ContactUsDialog"), { ssr: false });

// A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// gtag emit pageview event
Router.events.on("routeChangeComplete", (url) => {
  try {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url,
    });
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
});

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const router = useRouter();

  const dispatch = useDispatch();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    //

    // AddToAny js
    const onShare = function (data) {
      const queryString = new URL(data.url).search;

      const queryParams: any = qs.parse(queryString, { ignoreQueryPrefix: true });

      if (queryParams.type === "offer") {
        analytics.track("engagement", "share", queryParams.id, undefined);
        dispatch(shareOffer({ slug: queryParams.slug }));
      }

      if (queryParams.type === "brand") analytics.track("engagement", "share", undefined, queryParams.id);
      return {
        url: stripQueryStringAndHashFromPath(data.url),
      };
    };

    window.a2a_config = window.a2a_config || {};
    window.a2a_config.onclick = 1;
    window.a2a_config.callbacks = window.a2a_config.callbacks || [];
    window.a2a_config.callbacks.push({ share: onShare });

    (function () {
      const a = document.createElement("script");
      a.async = true;
      a.src = "https://static.addtoany.com/menu/page.js";
      const s = document.getElementsByTagName("script")[0];
      s?.parentNode?.insertBefore(a, s);
    })();
    //
  }, []);

  // Add listener to close all dialogs on route change
  React.useEffect(() => {
    const handleRouteChange = () => {
      dispatch(authActions.closeDialog());
      dispatch(closeEditOfferDialog());
      dispatch(closeNewOfferDialog());
      dispatch(closeUpgradeDialog());
      dispatch(closeContactUsDialog());
      dispatch(merchantCloseViewOfferDialog());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>SneakQIK</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        {/* canonical link */}
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <Auth> */}
          <Authorization>
            <Component {...pageProps} />
          </Authorization>
          {/* </Auth> */}

          {/* Contact US Dialog */}
          <ContactUsDialog />

          {/* Message */}
          <SneakQIKMessage />
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // authenticate
  if (ctx.req) {
    ctx.store.dispatch(authActions.loginUserWithToken(ctx));
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as any).sagaTask.toPromise();
  }

  //////////////////////////////////////////
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...pageProps,
      // Some custom thing for all pages
      pathname: ctx.pathname,
    },
  };
};

export default wrapper.withRedux(MyApp);
