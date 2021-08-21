import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Image from "next/image";
import { useDispatch } from "react-redux";

import Link from "components/core/Link";
import { closeViewOfferDialog } from "store/offers/actions";
import { UserBrand } from "types";

const useStyles = makeStyles({
  avatar: {
    width: 60,
    height: 60,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
});

type Props = {
  brand: UserBrand;
  className?: string;
  onFollow: (brand: UserBrand) => void;
};

const BrandListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { brand, className, onFollow } = props;

  return (
    <Link
      naked
      href={"/[brandSlug]"}
      as={`/${brand.slug}`}
      color="inherit"
      onClick={() => {
        dispatch(closeViewOfferDialog());
      }}
    >
      <div className={clsx("py-2 w-full flex items-center", className)}>
        <div className="w-15 h-15 mr-3">
          {/* <Avatar className={classes.avatar} alt={brand.name} src={brand.image}>
            {brand.name && brand.name.charAt(0)}
          </Avatar> */}
          <Avatar className={classes.avatar}>
            {brand.image && <Image src={brand.image} alt={brand.name} layout="fill" objectFit="cover" />}
            {brand.name && brand.name.charAt(0)}
          </Avatar>
        </div>

        <div className="mr-3 flex-1 flex flex-col overflow-hidden">
          <span className="font-bold text-sm truncate d-block mb-1">{brand.name}</span>
          <span className="font-normal text-xs">{brand.totalActiveOffers} Offers</span>
        </div>

        <Button
          variant="outlined"
          className="py-0 px-2 text-xs h-7"
          onClick={(e) => {
            e.preventDefault();
            onFollow(brand);
          }}
        >
          {brand.isFollowed ? "Following" : "Follow"}
        </Button>
      </div>
    </Link>
  );
};

export default BrandListItem;
