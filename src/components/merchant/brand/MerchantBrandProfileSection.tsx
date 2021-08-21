/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CameraIcon from "@material-ui/icons/CameraAlt";
import HelpIcon from "@material-ui/icons/Help";
import clsx from "clsx";
import Image from "next/image";
import { useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";
import BootstrapTooltip from "components/core/BootstrapTooltip";
import Link from "components/core/Link";
import FacebookIcon from "components/icons/FacebookIcon";
import InstagramIcon from "components/icons/InstagramIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import { Category, MerchantBrand } from "types";
import { generateShareLink } from "utils";

const useStyles = makeStyles({
  brandProfile: {
    position: "relative",
  },

  brandProfileBgImg: {
    width: "100%",
    height: 102,
    backgroundColor: "#F9F9F9",
    position: "relative",
    marginBottom: 47,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  },

  headerImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  headerImageCameraBtn: {
    position: "absolute",
    right: 0,
    top: 0,
  },

  logoCameraBtn: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: "8px",
  },

  brandAvatar: {
    position: "absolute",
    top: 57,
    left: "50%",
    transform: "translate(-50%, 0px)",
  },

  avatarBasic: {
    width: 80,
    height: 80,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },

  avatar: {
    background: "white",
    margin: "0 auto",
    marginTop: -40,
    zIndex: 10,
    width: 80,
    height: 80,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },

  name: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: "23px",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  upgradeBtn: {
    fontSize: 12,
    lineHeight: "15px",
    marginBottom: "22px",
  },
  chip: {
    borderColor: "#7036D5",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#7036D5",
  },
  icon: {
    height: 30,
    width: 30,
    display: "inline-block",
    margin: 3,
  },
});

type Props = {
  brand: MerchantBrand;
};

const MerchantBrandProfileSection: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { brand } = props;

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (window.a2a && window.a2a.init_all) {
      window.a2a.init_all();
    }
  }, []);

  const total = (brand.totalEngagement || 0) + (brand.totalClicks || 0);

  return (
    <div className={classes.brandProfile}>
      {brand.plan === "basic" ? (
        <>
          <div className={classes.brandProfileBgImg}>
            {brand.headerImage && (
              <img className={classes.headerImage} src={brand.headerImage} alt={`${brand.name} Header Image`} />
            )}
            <IconButton className={classes.headerImageCameraBtn} style={{ display: "none" }} aria-label="camera">
              <CameraIcon />
            </IconButton>
          </div>

          <div className={classes.brandAvatar}>
            {/* <Avatar className={classes.avatarBasic} alt={brand.name} src={brand.image}> */}
            <Avatar className={classes.avatarBasic} alt={brand.name}>
              <Image src={brand.image} layout="fill" objectFit="cover" />
              {brand.name && brand.name.charAt(0)}
            </Avatar>

            <IconButton className={classes.logoCameraBtn} style={{ display: "none" }} aria-label="camera">
              <CameraIcon />
            </IconButton>
          </div>
        </>
      ) : (
        // <Avatar className={classes.avatar} alt={brand.name} src={brand.image}>
        <Avatar className={classes.avatar} alt={brand.name}>
          <Image src={brand.image} layout="fill" objectFit="cover" />
          {brand.name && brand.name.charAt(0)}
        </Avatar>
      )}

      <div className="mx-4 flex flex-col items-center">
        <Typography variant="h6" className={classes.name}>
          {brand.name}
          {brand.name && (
            <Link href={`/merchant/settings/brands/[brandSlug]`} as={`/merchant/settings/brands/${brand.slug}`}>
              <IconButton aria-label="settings">
                <img className="opacity-30" width="18" height="18" alt="settings" src="/images/settings.png" />
              </IconButton>
            </Link>
          )}
        </Typography>

        {brand.plan === "basic" ? (
          <Link href={`/merchant/settings/subscription`}>Upgrade to include your Bio Link here</Link>
        ) : (
          <>
            <a className="text-xs text-primary mb-1" href={brand.primaryWebsite} target="_blank" rel="noopener">
              {brand.primaryWebsite}
            </a>
          </>
        )}

        <p className="font-bold">{brand.tagline}</p>

        <p className="my-4">{brand.description}</p>

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
              <TwitterIcon width={21} height={21} />
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

        <ul className="w-full px-2 mt-2">
          <li className="flex justify-between my-4">
            <span className="text-xs font-bold">Deal-Followers</span>
            <span className="text-sm font-bold text-primary">{brand.totalFollowers ?? "-"}</span>
          </li>

          <li className="flex justify-between my-4">
            <span className="text-xs font-bold">Total active offers</span>
            <span className="text-sm font-bold text-primary">{brand.totalActiveOffers ?? "-"}</span>
          </li>

          <li className="flex justify-between my-4">
            <span className="text-xs text-opacity-75 my-2">The below fields are shown only to you.</span>
          </li>

          <li className="flex justify-between my-4 items-center">
            <span className="text-xs font-bold">Total impressions</span>
            <span className="text-sm font-bold text-primary">
              {brand.plan === "basic" && (
                <BootstrapTooltip title="Upgrade to see the insights dashboard">
                  <HelpIcon fontSize="small" />
                </BootstrapTooltip>
              )}
              {brand.plan !== "basic" && brand.totalImpressions}
            </span>
          </li>

          <li className="flex justify-between my-4 items-center">
            <span className="text-xs font-bold">Total clicks to your website</span>
            <span className="text-sm font-bold text-primary">
              {brand.plan === "basic" && (
                <BootstrapTooltip title="Upgrade to see the insights dashboard">
                  <HelpIcon fontSize="small" />
                </BootstrapTooltip>
              )}
              {brand.plan !== "basic" && brand.totalClicks}
            </span>
          </li>

          <li className="flex justify-between my-4 items-center">
            <span className="text-xs font-bold">Total engagement</span>
            <span className="text-sm font-bold text-primary">
              {brand.plan === "basic" && (
                <BootstrapTooltip title="Upgrade to see the insights dashboard">
                  <HelpIcon fontSize="small" />
                </BootstrapTooltip>
              )}
              {brand.plan !== "basic" && total}
            </span>
          </li>
        </ul>

        <div className="mx-4 mt-4 mb-2 flex flex-col items-center">
          <span className="text-xs font-bold">Add SneakQIK icon to your site</span>
          <span className="text-xs mb-1">
            <img src="/sneakqik-color.png" alt="sneakqik-color" className={classes.icon} />
            <img src="/sneakqik-color-moving.gif" alt="sneakqik-color-dynamic" className={classes.icon} />
            <img src="/sneakqik-grey-moving.gif" alt="sneakqik-grey" className={classes.icon} />
            <img src="/sneakqik-color.gif" alt="sneakqik-clock" className={classes.icon} />
          </span>
        </div>

        <div className="mx-4 flex flex-col items-center">
          <span className="text-xs font-bold">Use your page link anywhere you like.</span>
          <span className="text-xs text-primary mb-1">
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/${brand.slug}`}>
              {" "}
              {`${process.env.NEXT_PUBLIC_SITE_URL}/${brand.slug}`}
            </Link>
          </span>
        </div>

        <GradientButton
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          className={clsx("a2a_dd", classes.upgradeBtn)}
          href="https://www.addtoany.com/share"
          data-a2a-url={generateShareLink("brand", brand)}
          data-a2a-title={`Join us on SneakQIK to follow ${brand.slug} and track all our best deals and special offers in one place including exclusive QIK deals. Click the link below.`}
        >
          Share your link
        </GradientButton>

        {user.plan !== "multi" && (
          <Link className="w-full" naked href="/merchant/settings/subscription">
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              className={classes.upgradeBtn}
            >
              Manage Subscription
            </GradientButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MerchantBrandProfileSection;
