import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Link from "components/core/Link";
import actions from "store/actions";
import { authActions } from "store/auth/actions";
import { getSelectedBrand } from "store/auth/reducer";
import { getBrands } from "store/entities/reducer";

import NotificationMenu from "./NotificationMenu";

// import OfferDialog from "features/OfferDialog";
const OfferDialog = dynamic(() => import("features/OfferDialog"), { ssr: false });
// import UpgradeDialog from "features/UpgradeDialog";
const UpgradeDialog = dynamic(() => import("features/UpgradeDialog"), { ssr: false });

const useStyles = makeStyles((theme: Theme) => ({
  sectionRight: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    marginRight: "12px",
    "& button": {
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
      color: "#6E33D4",
      outline: "none",
    },
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "0",
  },
  avatarName: {
    fontWeight: "bold",
    textTransform: "none",
    fontSize: 12,
    padding: 2,
    marginLeft: 4,
    outline: "none",
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  plusBtn: {
    padding: 0,
  },
  alertBtn: {
    marginRight: 8,
    boxShadow: "none",
    "&.Mui-focusVisible": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  menu: {
    "& ul": {
      width: 149,
    },
    "& .MuiMenuItem-root": {
      padding: "10.865px 12px",
    },
  },
  postOfferBtn: {
    height: 31,

    "&.MuiButton-root": {
      color: "#ffffff",
      fontSize: 12,
      outline: "none",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
    },
  },

  menuSectionTitle: {
    fontSize: "12px",
    color: "#0000004D",
    fontWeight: "bold",
    paddingLeft: 9,
  },
  addNewBrandBtn: {
    color: "#6E33D4",
    fontSize: "14px",
    fontWeight: "bold",
  },
  brandItem: {
    "&.MuiMenuItem-root": {
      padding: "4px 12px",
    },
  },
}));

const MerchantHeader = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(authActions.logoutRequest());
  };

  const handlePost = () => {
    dispatch(actions.merchant.brands.createOffer());
  };

  const handleSelectBrand = (id) => {
    handleClose();
    dispatch(authActions.selectBrand({ selectedBrand: id }));
  };

  const user = useSelector((state: any) => state.auth.user);

  const {
    brands: brandSlugs, //
    business,
    plan,
    selectedBrand,
  } = user;

  const selectedBrandData = useSelector(getSelectedBrand) || {};

  const brands = useSelector(getBrands(brandSlugs));

  return (
    <>
      <div className={classes.sectionRight}>
        <Tooltip title="Post an offer" aria-label="add">
          <span>
            <Fab
              className={classes.alertBtn}
              disabled={brands.length === 0}
              aria-label="post an offer"
              onClick={handlePost}
              size="small"
            >
              <AddIcon fontSize="small" />
            </Fab>
          </span>
        </Tooltip>

        <NotificationMenu />

        <Button
          disableRipple
          onClick={handleClick}
          className={classes.avatarName}
          endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {/* <Avatar className={classes.avatarSmall} alt={selectedBrandData.name} src={selectedBrandData.image}> */}
          <Avatar className={classes.avatarSmall} alt={selectedBrandData.name}>
            <Image src={selectedBrandData.image} layout="fill" objectFit="cover" />
            {selectedBrandData.name && selectedBrandData.name.charAt(0)}
          </Avatar>
        </Button>

        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.menu}
          onClick={handleClose}
        >
          {business ? (
            plan === "multi" ? (
              [
                <Typography key="title" className={classes.menuSectionTitle}>
                  SWITCH BRANDS
                </Typography>,
                ...brands.map((brand) => (
                  <MenuItem
                    key={brand.id}
                    onClick={() => handleSelectBrand(brand.id)}
                    className={classes.brandItem}
                    selected={brand.id === selectedBrand}
                    component={Link}
                    naked
                    href={`/merchant/brands/[brandSlug]`}
                    as={`/merchant/brands/${brand.slug}`}
                  >
                    <ListItemIcon>
                      {/* <Avatar className={classes.avatarSmall} alt={brand.name} src={brand.image}> */}
                      <Avatar className={classes.avatarSmall} alt={brand.name}>
                        <Image src={brand.image} layout="fill" objectFit="cover" />
                        {brand.name && brand.name.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      {brand.name}
                    </Typography>
                  </MenuItem>
                )),
                <MenuItem
                  key="add-a-new-brand"
                  className={classes.addNewBrandBtn}
                  component={Link}
                  naked
                  href={`/merchant/brands/draft`} //
                  as={`/merchant/brands/draft`}
                >
                  + Add a new brand
                </MenuItem>,
              ]
            ) : selectedBrand ? (
              <MenuItem
                component={Link}
                naked
                href={`/merchant/brands/[brandSlug]`}
                as={`/merchant/brands/${selectedBrandData.slug}`}
              >
                My Brand
              </MenuItem>
            ) : (
              <MenuItem component={Link} naked href={`/merchant/brands/draft`} as={`/merchant/brands/draft`}>
                My Brand
              </MenuItem>
            )
          ) : (
            <MenuItem component={Link} naked href="/merchant/settings/brands">
              Add your business
            </MenuItem>
          )}

          <Divider />

          <MenuItem component={Link} naked href={`/merchant/settings/general`}>
            Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </div>

      <OfferDialog />

      <UpgradeDialog />
    </>
  );
};

export default MerchantHeader;
