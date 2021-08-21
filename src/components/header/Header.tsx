import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popper from "@material-ui/core/Popper";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import algoliasearch from "algoliasearch/lite";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Index, InstantSearch, createConnector, connectHits } from "react-instantsearch-dom";
import { useSelector, useDispatch } from "react-redux";

import Link from "components/core/Link";
import GuestHeader from "components/header/GuestHeader";
import MerchantHeader from "components/header/MerchantHeader";
import UserHeader from "components/header/UserHeader";
import { mobileDrawerMenus } from "data/routes";
import AuthenticationForm from "features/AuthenticationForm";
import { authActions } from "store/auth/actions";
import supportActions from "store/support/actions";

import BrandSearchItem from "../shared/BrandSearchItem";
import OfferSearchItem from "../shared/OfferSearchItem";

// import OfferViewerDialog from "features/OfferViewerDialog";
const OfferViewerDialog = dynamic(() => import("features/OfferViewerDialog"));

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || ""
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: "1126px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    border: "1px solid #D7D7D7",
  },
  logoSection: {
    flexShrink: 0,
  },
  searchBoxSection: {
    flex: 1,
    maxWidth: 500,
    margin: "0 20px",
    display: "flex",
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
  menuSection: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  headerBar: {
    padding: "0 18px",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      padding: "0 12px",
    },
  },
  searchBox: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexBasis: "100%",
    [theme.breakpoints.up("sm")]: {},
  },
  inputRoot: {
    color: "#DADADA",
    border: "1px solid #EBEBEB",
    paddingLeft: theme.spacing(1.2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
    backgroundColor: "#fff",
    color: "#000000",
  },
  inputMobile: {
    width: "100%",
    backgroundColor: "#fff",
    marginLeft: 10,
    marginTop: 10,
  },
  results: {
    width: "500px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "black",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
    maxHeight: "calc(100vh - 200px)",
    overflow: "auto",
  },
  mobileResults: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    color: "black",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
  },
  mobileSearchWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  mobileSearchContent: {
    width: "100%",
    "& > div": {
      width: "100%",
    },
  },
  dialogPaper: {
    marginLeft: "15px",
    marginRight: "15px",
  },
  dialogContent: {
    padding: 24,
  },
  dialogTitle: { padding: 0 },
  closeButton: { position: "absolute", right: 0, zIndex: 1 },
  paper: {
    padding: theme.spacing(2),
    height: theme.spacing(20),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    zIndex: theme.zIndex.drawer + 2,
    position: "fixed",
  },

  drawer: {
    minWidth: 253,
  },

  drawerTop: {
    height: 90,
    paddingBottom: 13,
    position: "relative",
  },

  drawerCloseBtn: {
    alignSelf: "flex-end",
  },

  drawerMenu: {
    flex: 1,
    minWidth: 253,
    background: "#FAFAFA",
  },

  drawerLink: {
    "&.Mui-selected	": {
      background: "transparent",
      "& .MuiListItemText-root": {
        "& .MuiTypography-root": {
          color: "#7036D5",
        },
      },
    },
  },

  menuWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  resultSplit: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 1,
    backgroundColor: "#eeeeee",
  },

  searchresultFooter: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "right",
    paddingRight: 10,
    borderBottom: "1px solid #eeeeee",
  },
}));

const connectWithQuery = createConnector({
  displayName: "WidgetWithQuery",
  getProvidedProps(_props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || "";

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(_props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, _props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || "");
  },
  cleanUp(_props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const BrandCardHits = connectHits(({ hits: brands, onClose }) => {
  const brandsList = brands.slice(0, 5).map((brand) => {
    const clonedBrand = {
      ...brand,
      image: brand.image && `${process.env.NEXT_PUBLIC_API_URL}/media/${brand.image}`,
    };
    return <BrandSearchItem brand={clonedBrand} key={`search_${brand.slug}`} onClose={onClose} />;
  });

  const classes = useStyles();
  return (
    <div className="w-full bg-white">
      <h1 className="pl-4 pt-3 pb-3 text-xs font-bold text-neutral text-left">Brands</h1>
      {brandsList}
      <div className={classes.resultSplit} />
    </div>
  );
});

const OfferCardHits = connectHits(({ hits: offers, onClose }) => {
  const offersList = offers.slice(0, 10).map((offer) => {
    return <OfferSearchItem offer={offer} key={`search_${offer.slug}`} onClose={onClose} />;
  });

  return (
    <div className="w-full bg-white">
      <h1 className="pl-4 pt-3 pb-3 text-xs font-bold text-neutral text-left">Offers</h1>
      {offersList}
    </div>
  );
});

const MySearchBox = ({ currentRefinement, refine }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <InputBase
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder="Search offers or brands..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onClick={handleClick}
      />
      <Popper
        style={{ right: 0 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="bottom-start"
        disablePortal
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: false,
            element: null,
          },
        }}
        popperOptions={{
          styles: {
            right: 0,
          },
        }}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (anchorEl?.contains(window.document.activeElement)) {
              return;
            }
            handleClose();
          }}
        >
          <div className={classes.results}>
            <Index indexName="Brand">{currentRefinement && <BrandCardHits onClose={handleClose} />}</Index>
            <Index indexName="Offer">{currentRefinement && <OfferCardHits onClose={handleClose} />}</Index>
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

const ConnectedSearchBox = connectWithQuery(MySearchBox);

const MobileSearchBox = ({ currentRefinement, refine }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <InputBase
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder="Search offers or brands..."
        classes={{
          root: classes.inputMobile,
        }}
        inputProps={{ "aria-label": "search" }}
        onClick={handleClick}
      />
      <Popper
        style={{ right: 0 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="bottom-start"
        disablePortal
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: false,
            element: null,
          },
        }}
        popperOptions={{
          styles: {
            right: 0,
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className={classes.mobileResults}>
            <Index indexName="Brand">{currentRefinement && <BrandCardHits />}</Index>
            <Index indexName="Offer">{currentRefinement && <OfferCardHits />}</Index>
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

const ConnectedMobileSearchBox = connectWithQuery(MobileSearchBox);

export default function Header() {
  const classes = useStyles();
  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(authActions.closeDialog());
  };

  const authentication = () => {
    if (authState.user) {
      switch (authState.user.userType) {
        case "customer":
          return <UserHeader />;
        case "merchant":
          return <MerchantHeader />;
        default:
          return <GuestHeader />;
      }
    } else {
      return <GuestHeader />;
    }
  };

  const [mobileSearch, setMobileSearch] = React.useState<boolean>(false);

  const toggleMobileSearch = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setMobileSearch(open);
  };

  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const router = useRouter();

  // let msPaddingRight = 175;
  // if (authState.user) {
  //   switch (authState.user.userType) {
  //     case "customer":
  //       msPaddingRight = 125;
  //       break;
  //     case "merchant":
  //       msPaddingRight = 184;
  //       break;
  //   }
  // }
  // if (mobileSearch) msPaddingRight = 0;

  return (
    <InstantSearch searchClient={searchClient} indexName="Brand">
      <Head>
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
          // @ts-ignore
          onLoad="this.onload=null;this.rel='stylesheet'"
          integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
            integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
            crossOrigin="anonymous"
          />
        </noscript>

        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          // @ts-ignore
          onLoad="this.onload=null;this.rel='stylesheet'"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
            integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
            crossOrigin="anonymous"
          />
        </noscript>
      </Head>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={clsx(classes.headerBar, classes.container)}>
          <Hidden smUp>
            <div className={classes.menuWrapper}>
              {!mobileSearch && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                  edge="start"
                  style={{ color: "rgb(0, 0, 0, 0.54)" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <div className={classes.logoSection} style={mobileSearch ? { display: "none" } : { display: "block" }}>
                <Link href="/">
                  <img src="/logo.gif" width="100px" height="21px" alt="SneakQIK" />
                </Link>
              </div>
              <div
                className={classes.mobileSearchWrapper}
                style={{ backgroundColor: mobileSearch ? "#fff" : "transparent" }}
              >
                <div className={classes.mobileSearchContent}>{mobileSearch && <ConnectedMobileSearchBox />}</div>
                <IconButton
                  color="inherit"
                  aria-label="search"
                  onClick={toggleMobileSearch(!mobileSearch)}
                  style={{ color: "rgb(0, 0, 0, 0.54)" }}
                >
                  {!mobileSearch ? <SearchIcon /> : <CloseIcon />}
                </IconButton>
              </div>
            </div>
          </Hidden>
          <Hidden smUp>{!mobileSearch && <div className={classes.menuSection}>{authentication()}</div>}</Hidden>
          <Hidden xsDown>
            <div className={classes.logoSection}>
              <Link href="/">
                <img src="/logo.gif" width="100px" height="21px" alt="SneakQIK" />
              </Link>
            </div>
          </Hidden>
          <Hidden only="xs">
            <div className={classes.searchBoxSection}>
              <div className={classes.searchBox}>
                <ConnectedSearchBox />
              </div>
            </div>
          </Hidden>
          <Hidden only="xs">
            <div className={classes.menuSection}>{authentication()}</div>
          </Hidden>
          <Hidden xsUp={true}>
            <div className={classes.searchBar}>
              <div className={classes.searchBoxSection}>
                <div style={{ width: "100%" }}>
                  <ConnectedSearchBox />
                </div>
              </div>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <IconButton
          className={classes.drawerCloseBtn}
          color="inherit"
          aria-label="close drawer"
          onClick={toggleDrawer(false)}
          edge="start"
        >
          <CloseIcon />
        </IconButton>
        {authState.user && (
          <div className={clsx("flex flex-col justify-between items-center", classes.drawerTop)}>
            {/* <Avatar src={authState.user.avatar} /> */}
            <Avatar>
              <Image src={authState.user.avatar} layout="fill" objectFit="cover" />
            </Avatar>
            <Typography variant="h6">{authState.user.username}</Typography>
          </div>
        )}
        <List className={classes.drawerMenu}>
          {mobileDrawerMenus.map((m) => (
            <ListItem
              className={classes.drawerLink}
              href={m.url}
              component={Link}
              button
              key={m.name}
              selected={m.url === router.pathname}
            >
              <ListItemText
                primary={m.name}
                color="inherit"
                className={m.url === router.pathname ? "selected-text" : ""}
              />
            </ListItem>
          ))}
          <ListItem button key="Contact US" onClick={() => dispatch(supportActions.showContactUsDialog())}>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </Drawer>

      {/* Authentication Dialog */}
      <Dialog
        open={authState.open}
        maxWidth="xs"
        disableBackdropClick
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <IconButton
            disabled={authState.registerStatus === "pending"}
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <AuthenticationForm />
        </DialogContent>
      </Dialog>

      <OfferViewerDialog />
    </InstantSearch>
  );
}
