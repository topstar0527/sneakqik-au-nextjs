import React from "react";

import { useSelector, useDispatch } from "react-redux";

import analytics from "api/analytics";
import OfferPost from "components/shared/OfferPost";
import { likeOffer, saveOffer, followBrand } from "store/entities/actions";
import { getBrandBySlug, getOfferBySlug } from "store/entities/reducer";
import { openViewOfferDialog } from "store/offers/actions";
import { OfferBase, UserBrand } from "types";

type Props = {
  className?: string;
  slug: string;
};

const ConnectedOfferPost: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

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
        break;
      }
      default:
        break;
    }
  };

  const { className, slug } = props;
  const offer: OfferBase = useSelector(getOfferBySlug(slug));
  const brand: UserBrand = useSelector(getBrandBySlug(offer.brand));

  return (
    <OfferPost
      className={className}
      offer={offer}
      brand={brand}
      onSocialAction={handleAction}
      onFollow={(brand) => {
        dispatch(followBrand(brand));
      }}
      onMediaClick={(offer) => {
        analytics.track("click", "click", offer.id);
      }}
      onMediaShow={(offer) => {
        analytics.track("impression", "show", offer.id);
      }}
    />
  );
};

export default ConnectedOfferPost;
