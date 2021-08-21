import React from "react";

import { useDispatch, useSelector } from "react-redux";

import BrandCard from "components/shared/BrandCard";
import { followBrand } from "store/entities/actions";
import { getEntities } from "store/entities/reducer";
import { UserBrand } from "types";

type Props = {
  brandId: string;
};

export const ConnectedBrandCard: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const entities = useSelector(getEntities);

  const handleFollow = async (b: UserBrand) => {
    dispatch(followBrand(b));
  };

  const brand = entities.brands[props.brandId];

  return <BrandCard brand={brand} onFollow={handleFollow} />;
};

export default ConnectedBrandCard;
