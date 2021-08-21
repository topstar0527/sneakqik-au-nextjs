import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Link from "components/core/Link";
import { OfferBase } from "types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    minHeight: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15,
    boxSizing: "border-box",
    "&:hover": {
      background: "#F3F3F3",
    },
  },

  avatar: {
    width: 38,
    height: 38,
  },

  itemWrapper: {
    paddingLeft: 20,
    paddingRight: 35,
    width: "100%",
  },

  name: {
    textAlign: "left",
  },

  description: {
    textAlign: "left",
    paddingTop: 5,
    color: "#999999",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

type Props = {
  offer: OfferBase;
  onClose: () => void;
};

const OfferSearchItem: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { offer, onClose } = props;
  return (
    <Link naked href={"/offers/[offerSlug]"} as={`/offers/${offer.slug}`} color="inherit" onClick={onClose}>
      <div className={classes.root}>
        <Typography className={classes.name} variant="body2">
          {offer.title}
        </Typography>
      </div>
    </Link>
  );
};

export default OfferSearchItem;
