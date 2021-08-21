import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import Footer from "components/shared/Footer";
import BrandListItem from "components/shared/home/BrandListItem";
import OfferListItem from "components/shared/home/OfferListItem";
import { getBrandsRequest } from "store/customer/home/actions";
import { followBrand } from "store/entities/actions";
import { getEntities } from "store/entities/reducer";
import { UserBrand, OfferBase, BrandBase } from "types";

const useStyles = makeStyles(() => ({
  seeallbrands: {
    color: "#7036D5",
    fontSize: 14,
    fontWeight: "bold",
  },
}));

const MAX_LENGTH = 8;

type Props = {
  brand?: UserBrand;
  offer?: OfferBase;
};

const BrandSuggestionSection: React.FC<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { brand, offer } = props;

  const home = useSelector((state: any) => state.customer.home);

  const entities = useSelector(getEntities);

  const { brands } = home;

  let offersSuggestions: OfferBase[] = [];
  const brandsSameCategory: string[] = [];
  let relatedOffers: OfferBase[] = [];

  // If current view has an active Brand, fetch other offers for this brand.
  if (brand && offer) {
    const entitiesOffers: { 0: string; 1: OfferBase }[] = Object.entries(entities.offers);
    entitiesOffers.map((item) => {
      offersSuggestions.push(item[1]);
    });
    offersSuggestions = offersSuggestions
      .filter((item) => item.brand === brand.slug) // filter only offers from the same brand
      .filter((item) => item.id !== offer.id) // remove the current offer
      .filter((item) => {
        if (item.expireDate) {
          return new Date(item.expireDate) > new Date();
        } else {
          return false;
        }
      }); // remove expired offers

    const entitiesBrands: { 0: string; 1: BrandBase }[] = Object.entries(entities.brands);
    entitiesBrands.map((item) => {
      if (typeof item[1].category === "string") return;
      if (typeof brand.category === "string") return;

      if (item[1].category.id === brand.category.id) {
        brandsSameCategory.push(item[1].slug);
      }
    });

    entitiesOffers.map((item) => {
      if (brandsSameCategory.find((brandSlug) => item[1].brand === brandSlug)) {
        relatedOffers.push(item[1]);
      }
    });

    relatedOffers = relatedOffers
      .filter((item) => !offersSuggestions.includes(item)) // removes offers from same brand (already shown in offersSuggestions)
      .filter((item) => item.id !== offer.id) // remove the current offer
      .filter((item) => {
        if (item.expireDate) {
          return new Date(item.expireDate) > new Date();
        } else {
          return false;
        }
      }); // remove expired offers
    relatedOffers = relatedOffers.sort((a, b) => b.likesCount - a.likesCount); // Sort by `likesCount`
  }

  React.useEffect(() => {
    dispatch(getBrandsRequest());
  }, [offer?.slug]);

  return (
    <>
      {/* `More from this brand` Section */}
      {offersSuggestions.length > 0 && (
        <div className="flex flex-col pt-8 px-5">
          <h6 className="font-bold text-base mb-1">More from this brand</h6>

          <div>
            {offersSuggestions.slice(0, 5).map((item, index) => (
              <OfferListItem
                key={item.slug}
                offer={item}
                className={
                  index === offersSuggestions.slice(0, 5).length - 1
                    ? ""
                    : "border-solid border-b border-black border-opacity-10"
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* `Related Offers` Section */}
      {relatedOffers.length > 0 && (
        <div className="flex flex-col pt-8 px-5">
          <h6 className="font-bold text-base mb-1">Related offers</h6>

          <div>
            {relatedOffers.slice(0, 5).map((item, index) => (
              <OfferListItem
                key={item.slug}
                offer={item}
                className={
                  index === relatedOffers.slice(0, 5).length - 1
                    ? ""
                    : "border-solid border-b border-black border-opacity-10"
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* `Related Brands` Section */}
      <div className="flex flex-col pt-8 px-5">
        <h6 className="font-bold text-base mb-1">Brands to follow</h6>

        <div>
          {brands.slice(0, MAX_LENGTH).map((slug, index) => (
            <BrandListItem
              onFollow={(brand) => {
                dispatch(followBrand(brand));
              }}
              key={slug}
              brand={entities.brands[slug]}
              className={index === MAX_LENGTH - 1 ? "" : "border-solid border-b border-black border-opacity-10"}
            />
          ))}

          {false && (
            <div className="flex flex-col mt-4">
              <Button className={classes.seeallbrands}>See all brands</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(BrandSuggestionSection);
