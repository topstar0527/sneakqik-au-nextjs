/* eslint-disable react/no-unescaped-entities */
import React from "react";

import { useSelector, useDispatch } from "react-redux";

import analytics from "api/analytics";
import MerchantOfferCard from "components/shared/MerchantOfferCard";
import { likeOffer, saveOffer } from "store/entities/actions";
import { getBrandBySlug, getOfferBySlug } from "store/entities/reducer";
import { merchantOpenViewOfferDialog, openViewOfferDialog } from "store/offers/actions";
import { OfferBase } from "types";

type Props = {
  className?: string;
  onMoreClick?: (e: React.MouseEvent<HTMLButtonElement>, offer: OfferBase) => void;
  slug: string;
};

const ConnectedMerchantOfferCard: React.FC<Props> = (props) => {
  const { onMoreClick, slug } = props;

  const dispatch = useDispatch();

  const handleView = async (slug: string) => {
    dispatch(merchantOpenViewOfferDialog({ offer: slug }));
  };

  const offer = useSelector(getOfferBySlug(slug));
  const brand = useSelector(getBrandBySlug(offer.brand));

  const handleAction = (action: string, offer: OfferBase) => {
    switch (action) {
      case "like": {
        dispatch(likeOffer(offer));
        analytics.track("engagement", "like", offer.id);
        break;
      }
      case "save": {
        dispatch(saveOffer(offer));
        analytics.track("engagement", "save", offer.id);
        break;
      }
      case "comment": {
        dispatch(openViewOfferDialog({ offer: offer.slug, brand: offer.brand, autoFocus: true }));
        analytics.track("engagement", "comment", offer.id);
        break;
      }
      default:
        break;
    }
  };

  return (
    <MerchantOfferCard
      offer={offer}
      brand={brand}
      editable
      onView={handleView}
      onMoreClick={onMoreClick}
      onSocialAction={handleAction}
    />
  );
};

export default ConnectedMerchantOfferCard;
