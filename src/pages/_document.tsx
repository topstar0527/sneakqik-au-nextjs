import React from "react";

import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Html, Head, Main, NextScript } from "next/document";

import theme from "../theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {/* prevent most search engine web crawlers from indexing a page on your site */}

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

          <link rel="preload" as="image" href="/logo.gif" />

          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            media="print"
            // @ts-ignore
            onLoad="this.media='all'"
          />
          <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          </noscript>

          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
            media="print"
            // @ts-ignore
            onLoad="this.media='all'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
            />
          </noscript>

          <link rel="preload" as="style" href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
            media="print"
            // @ts-ignore
            onLoad="this.media='all'"
          />
          <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" />
          </noscript>

          <link
            rel="preload"
            as="style"
            href="/nprogress.css"
            // @ts-ignore
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link rel="stylesheet" href="/nprogress.css" />
          </noscript>

          {/* <!-- Global site tag (gtag.js) - Google Analytics -->  */}

          {process.env.NEXT_PUBLIC_ENV === "production" && (
            <React.Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || []; 
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date()); 
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                `,
                }}
              />
            </React.Fragment>
          )}

          {process.env.NEXT_PUBLIC_ENV !== "production" && <meta name="robots" content="noindex, nofollow" />}

          {/* <!-- Google Tag Manager --> */}
          {process.env.NEXT_PUBLIC_ENV === "production" && (
            <React.Fragment>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-523JMKB');
                  `,
                }}
              />
            </React.Fragment>
          )}
          {/* <!-- End Google Tag Manager --> */}
        </Head>

        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          {process.env.NEXT_PUBLIC_ENV === "production" && (
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <!-- Google Tag Manager (noscript) -->
                  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-523JMKB"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                  <!-- End Google Tag Manager (noscript) -->
                `,
              }}
            />
          )}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
