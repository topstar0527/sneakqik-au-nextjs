import React from "react";

import { useSelector, useDispatch } from "react-redux";

import analytics from "api/analytics";
import OfferViewer from "components/shared/OfferViewer";
import { likeOffer, saveOffer, followBrand } from "store/entities/actions";
import { getBrandBySlug, getOfferBySlug } from "store/entities/reducer";
import { getOfferViewerDialog } from "store/offers/reducer";
import { OfferBase, UserBrand } from "types";

type Props = {
  isModal?: boolean;
  slug: string;
};

const ConnectedOfferViewer: React.FC<Props> = (props) => {
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
      default:
        break;
    }
  };

  const offer: OfferBase = useSelector(getOfferBySlug(props.slug));
  const brand: UserBrand = useSelector(getBrandBySlug(offer.brand));
  const viewerDialog = useSelector(getOfferViewerDialog);

  let autoFocus = false;
  if (viewerDialog.data && viewerDialog.data.autoFocus) autoFocus = viewerDialog.data.autoFocus;

  return (
    <OfferViewer
      autoFocus={autoFocus}
      offer={offer}
      brand={brand}
      onSocialAction={handleAction}
      onMediaClick={(offer) => {
        analytics.track("click", "click", offer.id);
      }}
      onMediaShow={(offer) => {
        analytics.track("impression", "show", offer.id);
      }}
      onFollow={(brand) => {
        dispatch(followBrand(brand));
        analytics.track("engagement", "follow", undefined, brand.id);
      }}
      isModal={props.isModal}
    />
  );
};

export default ConnectedOfferViewer;
