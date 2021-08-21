import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import useSWR from "swr";

import API from "api";
import CheckIcon from "assets/icons/check.svg";
import { GradientButton } from "components/Buttons";
import { Gallery, GalleryItem, Tile } from "components/Gallery";
import EclipseLayout from "layouts/EclipseLayout";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: "980px",
    height: 0,
  },
  checkIcon: {
    fill: "transparent",
    fontSize: "34px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "49px",
    },
  },
  title: {
    minHeight: "34px",
    marginTop: "0px",
    marginBottom: 13,

    color: "#FFF",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",

    [theme.breakpoints.up("sm")]: {
      minHeight: "49px",
      marginTop: "12px",
      marginBottom: "35px",

      fontSize: "30px",
      lineHeight: "37px",
    },
  },
  description: {
    marginBottom: "48px",

    color: "#FFF",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "22px",
    textAlign: "center",

    [theme.breakpoints.up("sm")]: {
      marginBottom: "48px",

      fontWeight: 500,
      fontSize: "25px",
      lineHeight: "31px",
    },
  },
  newsFeedGrid: {
    flex: 1,
    width: "100%",
    marginBottom: "16px",

    [theme.breakpoints.up("sm")]: {
      marginBottom: "36px",
    },
  },
  nextBtn: {
    width: "100%",
    height: "40px",
    maxWidth: "266px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "363px",
      marginBottom: "10px",
      height: "47px",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    flexDirection: "column",
  },
  loadingIndicator: {
    marginBottom: "18px",
    opacity: 0.5,
  },
  loadingDescription: {
    fontSize: "18px",
    lineHeight: "21px",
    textAlign: "center",
  },
}));

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);

const Personalize: React.FunctionComponent = () => {
  const classes = useStyles();

  // const [step, setStep] = React.useState(0);

  const { data: categories } = useSWR("/categories/", fetcher);

  // const { data: brands } = useSWR("/brands/", fetcher);

  const user = useSelector((state: any) => state.auth.user);

  const [selectedCategories, setSelectedCategories] = React.useState<{ [index: string]: boolean }>({});

  const [selectedBrands, setSelectedBrands] = React.useState<{ [index: string]: boolean }>({});

  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user) {
      const temp1: { [index: string]: boolean } = {};
      user.favoriteCategories.forEach((item: any) => {
        temp1[item.category] = true;
      });
      setSelectedCategories(temp1);

      const temp2: { [index: string]: boolean } = {};
      user.favoriteBrands.forEach((item: any) => {
        temp2[item.brand] = true;
      });
      setSelectedBrands(temp2);
    }
  }, [user]);

  const handleCategorySelect = React.useCallback((itemId: number) => {
    setSelectedCategories((state) => ({
      ...state,
      [itemId.toString()]: !state[itemId.toString()],
    }));
  }, []);

  // const handleBrandSelect = React.useCallback((itemId: number) => {
  //   setSelectedBrands((state) => ({
  //     ...state,
  //     [itemId.toString()]: !state[itemId.toString()],
  //   }));
  // }, []);

  // const handleNext = () => {
  //   setStep(1);
  // };

  const handleStart = async () => {
    try {
      setLoading(true);
      await API.auth.updateUserProfile({
        favoriteCategories: Object.keys(selectedCategories)
          .filter((key) => selectedCategories[key])
          .map((key) => ({ user: user.id, category: key })),
        favoriteBrands: Object.keys(selectedBrands)
          .filter((key) => selectedBrands[key])
          .map((key) => ({ user: user.id, brand: key })),
      });
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const renderCategories = React.useCallback(() => {
    return (
      <Container component="main" maxWidth="lg" className={classes.main}>
        <Typography
          className={classes.title}
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <SvgIcon className={classes.checkIcon} component={CheckIcon} viewBox="0 0 49 49" />
          {" Account created"}
        </Typography>

        <Typography className={classes.description} variant="h5" align="center" color="textSecondary" paragraph>
          Choose three or more favorite categories that you want to see in your newsfeed
        </Typography>

        <PerfectScrollbar className={classes.newsFeedGrid}>
          <Gallery>
            {categories &&
              categories.map((tile: Tile) => (
                <GalleryItem
                  key={tile.id}
                  {...tile}
                  selected={selectedCategories[tile.id]}
                  onSelect={handleCategorySelect}
                />
              ))}
          </Gallery>
        </PerfectScrollbar>

        <GradientButton
          type="submit"
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          className={classes.nextBtn}
          onClick={handleStart}
        >
          START SHOPPING
        </GradientButton>
      </Container>
    );
  }, [categories, selectedCategories]);

  // const renderBrands = React.useCallback(() => {
  //   return (
  //     <Container maxWidth="lg" className={classes.main}>
  //       <Typography
  //         className={classes.title}
  //         component="h1"
  //         variant="h4"
  //         align="center"
  //         color="textPrimary"
  //         gutterBottom
  //       >
  //         One step closer to your personalised newsfeed
  //       </Typography>

  //       <Typography className={classes.description} variant="h5" align="center" color="textSecondary" paragraph>
  //         Follow three or more brands that you want to keep up-to-date in your newsfeed
  //       </Typography>

  //       <PerfectScrollbar className={classes.newsFeedGrid}>
  //         <Gallery>
  //           {brands &&
  //             brands.map((tile: Tile) => (
  //               <GalleryItem key={tile.id} {...tile} selected={selectedBrands[tile.id]} onSelect={handleBrandSelect} />
  //             ))}
  //         </Gallery>
  //       </PerfectScrollbar>

  //       <GradientButton
  //         type="submit"
  //         variant="contained"
  //         disableElevation
  //         size="large"
  //         color="primary"
  //         className={classes.nextBtn}
  //         onClick={handleStart}
  //       >
  //         START SHOPPING
  //       </GradientButton>
  //     </Container>
  //   );
  // }, [brands, selectedBrands]);

  return (
    <EclipseLayout>
      {renderCategories()}
      {/* {step === 0 ? renderCategories() : renderBrands()} */}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.loadingIndicator} thickness={8} size={89} color="inherit" />
        <Typography className={classes.loadingDescription} component="p">
          Personalising your newsfeed...
        </Typography>
      </Backdrop>
    </EclipseLayout>
  );
};

export default Personalize;
