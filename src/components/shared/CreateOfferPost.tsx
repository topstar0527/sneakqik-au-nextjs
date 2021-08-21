import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

import { MerchantBrand } from "types";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid #cccccc",
    background: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: 40,
    height: 40,
    marginRight: 11,
    border: "1px solid #DDDDDD",
  },

  input: {
    flex: 1,
    fontSize: 16,
    justifyContent: "left",
    opacity: 0.7,
  },
}));

type Props = {
  brand: MerchantBrand;
  onCreate: () => void;
};

const CreateOfferPost: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { brand, onCreate } = props;

  return (
    <div className={classes.root}>
      {/* <Avatar className={classes.avatar} src={brand.image} alt={brand.name} /> */}
      <Avatar className={classes.avatar} alt={brand.name}>
        <Image src={brand.image} layout="fill" objectFit="cover" />
      </Avatar>
      <Chip className={classes.input} label="Post your today's best offer" clickable onClick={onCreate} />
    </div>
  );
};

export default CreateOfferPost;
