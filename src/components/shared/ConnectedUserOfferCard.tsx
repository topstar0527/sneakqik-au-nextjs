import React from "react";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import analytics from "api/analytics";
import UserOfferCard from "components/shared/UserOfferCard";
import { likeOffer, saveOffer } from "store/entities/actions";
import { getOfferBySlug, getBrandLogoBySlug, getBrandNameBySlug } from "store/entities/reducer";
import { openViewOfferDialog } from "store/offers/actions";
import { OfferBase } from "types";

type Props = {
  className?: string;
  hasOverlay?: boolean;
  hasPostByLabel?: boolean;
  onMoreClick?: (e: React.MouseEvent<HTMLButtonElement>, offer: OfferBase) => void;
  showLogo?: boolean;
  slug: string;
};

const ConnectedUserOfferCard: React.FC<Props> = (props) => {
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
        analytics.track("engagement", "comment", offer.id);
        break;
      }
      default:
        break;
    }
  };

  const { className, hasOverlay, hasPostByLabel, onMoreClick = _.noop, showLogo, slug } = props;

  const offer: OfferBase = useSelector(getOfferBySlug(slug));

  const brandLogo = useSelector(getBrandLogoBySlug(offer.brand));

  const brandName = useSelector(getBrandNameBySlug(offer.brand));

  return (
    <UserOfferCard
      brandLogo={brandLogo}
      brandName={brandName}
      className={className}
      hasPostByLabel={hasPostByLabel}
      offer={offer}
      onView={() => dispatch(openViewOfferDialog({ offer: slug, brand: offer.brand }))}
      onMoreClick={onMoreClick}
      onSocialAction={handleAction}
      showLogo={showLogo}
      hasOverlay={hasOverlay}
      onMediaClick={(offer) => {
        analytics.track("click", "click", offer.id);
      }}
      onMediaShow={(offer) => {
        analytics.track("impression", "show", offer.id);
      }}
    />
  );
};

export default React.memo(ConnectedUserOfferCard);
