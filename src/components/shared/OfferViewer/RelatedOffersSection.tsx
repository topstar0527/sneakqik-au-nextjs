import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Link from "components/core/Link";

const useStyles = makeStyles({
  offerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "20px 0 14px",
  },
  seeallbrands: {
    color: "#7036D5",
    fontSize: 14,
    fontWeight: "bold",
  },
  offersList: {
    "& .item": {
      display: "flex",
      padding: "7px 9px",
      border: "1px solid #e1e1e1",
      marginBottom: 8,
      borderRadius: 2,
    },
    "& .item:last-child": {
      marginBottom: 22,
    },
  },
  offersAvatar: {
    width: 58,
    height: 58,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 13,
  },
  title: {
    fontWeight: "bold",
  },
  author: {
    color: "#7D7D7D",
    fontSize: 14,
    "& a": {
      color: "#6E33D4",
      textDecoration: "none",
    },
  },
});

const relatedOfferData = [
  {
    id: 1,
    image: "/images/product.png",
    title: "15% off summer cottom linen pajamas",
    author: "ASOS",
  },
  {
    id: 2,
    image: "/images/product.png",
    title: "15% off summer cottom linen pajamas",
    author: "ASOS",
  },
  {
    id: 3,
    image: "/images/product.png",
    title: "15% off summer cottom linen pajamas",
    author: "ASOS",
  },
  {
    id: 4,
    image: "/images/product.png",
    title: "15% off summer cottom linen pajamas",
    author: "ASOS",
  },
  {
    id: 5,
    image: "/images/product.png",
    title: "15% off summer cottom linen pajamas",
    author: "ASOS",
  },
];

const RelatedOfferItem = ({ data }) => {
  const classes = useStyles();

  return (
    <div className="item">
      <Avatar variant="square" alt="Boss" src={data.image} className={classes.offersAvatar} />
      <div className={classes.details}>
        <Typography className={classes.title}>{data.title}</Typography>
        <Typography className={classes.author}>
          By <Link href="#">{data.author}</Link>
        </Typography>
      </div>
    </div>
  );
};

const RelatedOffersSection = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.offerTitle}>Related Offers</Typography>
      <div className={classes.offersList}>
        {relatedOfferData.map((data) => (
          <RelatedOfferItem key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default RelatedOffersSection;
