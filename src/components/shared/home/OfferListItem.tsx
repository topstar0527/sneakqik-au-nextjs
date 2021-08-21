import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import Truncate from "react-truncate";

import Link from "components/core/Link";
import { closeViewOfferDialog } from "store/offers/actions";
import { OfferBase } from "types";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 60,
    height: 60,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
  moreText: {
    display: "block",
    color: "#aaa",
    cursor: "pointer",
  },
  relatedBrandName: {
    marginTop: 7,
    "& a": {
      color: theme.palette.primary.main,
      "&:hover": { textDecoration: "underline" },
    },
  },
}));

type Props = {
  className?: string;
  offer: OfferBase;
};

const OfferListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { className, offer } = props;

  return (
    <Link
      naked
      href={"/offers/[offerSlug]"}
      as={`/offers/${offer.slug}`}
      color="inherit"
      onClick={() => {
        dispatch(closeViewOfferDialog());
      }}
    >
      <div className={clsx("py-2 w-full flex items-center", className)}>
        <div className="w-15 h-15 mr-3">
          <Avatar variant="square" className={classes.avatar} alt={offer.title} src={offer.image}>
            {offer.title && offer.title.charAt(0)}
          </Avatar>
        </div>
        <div className=" text-sm d-block">
          <div className="font-bold">
            <Truncate lines={2} ellipsis={<span>...</span>}>
              {offer.title}
            </Truncate>
          </div>

          <div className={classes.relatedBrandName}>
            By{" "}
            <Link
              naked
              href={"/[brandSlug]"}
              as={`/${offer.brand}`}
              color="inherit"
              onClick={() => {
                dispatch(closeViewOfferDialog());
              }}
            >
              {offer.brand}
            </Link>
          </div>
        </div>

        {/* <Button
          variant="outlined"
          className="py-0 px-2 text-xs h-7"
          onClick={(e) => {
            e.preventDefault();
            onLike(offer);
          }}
        >
          {offer.isLiked ? "Liked" : "Like"}
        </Button> */}
      </div>
    </Link>
  );
};

export default OfferListItem;
