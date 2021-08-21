/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { useDispatch } from "react-redux";

import analytics from "api/analytics";
import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import FacebookIcon from "components/icons/FacebookIcon";
import InstagramIcon from "components/icons/InstagramIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import { followBrand } from "store/entities/actions";
import { UserBrand, Category } from "types";

const useStyles = makeStyles({
  name: {
    fontSize: 16,
    lineHeight: "23px",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  followBtn: {
    fontSize: 12,
    lineHeight: "15px",
    maxHeight: 35,
  },
  infoBox: {
    background: "linear-gradient(270deg, #42CFD0 0%, rgba(255, 255, 255, 0) 98.35%), #6E33D4",
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 15,
    color: "#ffffff",
  },
  tagLine: {
    fontWeight: 700,
    marginBottom: 15,
    textAlign: "center",
  },
  chip: {
    borderColor: "#7036D5",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#7036D5",
  },
  avatar: {
    background: "white",
    margin: "0 auto",
    width: 80,
    height: 80,
    marginTop: -40,
    zIndex: 10,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
});

type Props = {
  brand: UserBrand;
};

const BrandProfileSection: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { brand } = props;

  const handleFollow = async () => {
    dispatch(followBrand(brand));
  };

  const handleWebsiteLinkClick = () => {
    analytics.track("click", "click", undefined, brand.id);
  };

  return (
    <div>
      {brand.plan === "basic" && (
        <div className="w-full h-24 relative flex justify-center">
          {brand.headerImage && (
            <img className="w-full h-full object-cover" src={brand.headerImage} alt={`${brand.name} Header Image`} />
          )}
        </div>
      )}

      {/* <Avatar className={classes.avatar} alt={brand.name} src={brand.image}>
        {brand.name && brand.name.charAt(0)}
      </Avatar> */}
      <Avatar className={classes.avatar} alt={brand.name}>
        {brand.image && <Image src={brand.image} layout="fill" objectFit="cover" />}
        {brand.name && brand.name.charAt(0)}
      </Avatar>

      <div className="mx-4 flex flex-col items-center">
        <Typography variant="h6" className={classes.name}>
          {brand.name}
        </Typography>

        {brand.plan !== "basic" && (
          <a
            className="text-xs text-primary mb-1"
            onClick={handleWebsiteLinkClick}
            href={brand.primaryWebsite}
            target="_blank"
            rel="noopener "
          >
            {brand.primaryWebsite}
          </a>
        )}

        <div className={classes.tagLine}>{brand.tagline}</div>

        <GradientButton
          fullWidth
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          // className={classes.followBtn}
          className={classes.followBtn}
          onClick={handleFollow}
        >
          {brand.isFollowed ? "Following" : "Follow"}
        </GradientButton>

        <ul className="w-full pr-1 mt-2">
          <li className="flex justify-between my-4">
            <span className="text-xs font-bold">Followers:</span>
            <span className="text-sm font-bold text-primary">{brand.totalFollowers}</span>
          </li>

          <li className="flex justify-between my-4">
            <span className="text-xs font-bold">Total Offers:</span>
            <span className="text-sm font-bold text-primary">{brand.totalActiveOffers}</span>
          </li>
        </ul>

        <p className="mb-4">{brand.description}</p>

        <div className="w-full mb-4">
          {brand.category && (
            <Chip className={classes.chip} clickable label={(brand.category as Category).name} variant="outlined" />
          )}
        </div>

        <ul className="w-full">
          {brand.publicPhoneNumber && (
            <li className="mb-2">
              <span className="text-xs font-bold inline-block w-24">Phone number:</span>
              <span>{brand.publicPhoneNumber}</span>
            </li>
          )}

          {brand.publicEmail && (
            <li className="mb-2">
              <span className="text-xs font-bold inline-block w-24">Email:</span>
              <span>{brand.publicEmail}</span>
            </li>
          )}
        </ul>

        <div className="w-full flex justify-evenly my-2">
          {brand.twitterUrl && (
            <IconButton aria-label="twitter" target="_blank" href={brand.twitterUrl} role="button">
              <TwitterIcon />
            </IconButton>
          )}
          {brand.facebookUrl && (
            <IconButton aria-label="facebook" target="_blank" href={brand.facebookUrl} role="button">
              <FacebookIcon />
            </IconButton>
          )}
          {brand.instagramUrl && (
            <IconButton aria-label="instagram" target="_blank" href={brand.instagramUrl} role="button">
              <InstagramIcon />
            </IconButton>
          )}
        </div>

        <Divider className="w-full" />

        <Box className={classes.infoBox}>
          <Typography className={classes.menuTitle}>
            We&apos;ve launched and we&apos;d love your support! Welcome to the BETA launch of our new social offers
            platform SneakQIK (mobile app coming soon). We help discount seekers find exclusive deals and non-spam
            coupons from their favorite brands...<Link href="/about">read more</Link>
          </Typography>
        </Box>

        <Divider className="w-full" />
      </div>
    </div>
  );
};

export default BrandProfileSection;
