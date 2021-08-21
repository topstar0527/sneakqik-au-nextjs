import moment from "moment";

import base from "./base";

const followBrand = (data) => {
  return base({
    url: `/brands/${data.id}/follow/`,
    method: "post",
  });
};

const getBrands = () => {
  return base({
    url: `/brands/`,
    method: "get",
  });
};

const unfollowBrand = (data) => {
  return base({
    url: `/brands/${data.id}/unfollow/`,
    method: "post",
  });
};

const getOffers = ({ pagination, query }) => {
  const q = {
    ...query,
    offer_type: query.type,
    min_expire_date: moment().format(),
    max_published_date: moment().endOf("day").format(),
    offset: pagination.offset,
    limit: 10,
    status: "published",
  };

  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/offers`,
    method: "get",
    params: q,
  });
};

const like = (id) => {
  return base({
    url: `/offers/${id}/like/`,
    method: "post",
  });
};

const unlike = (id) => {
  return base({
    url: `/offers/${id}/dislike/`,
    method: "post",
  });
};

const save = (id) => {
  return base({
    url: `/offers/${id}/save/`,
    method: "post",
  });
};

const report = (id) => {
  return base({
    url: `/offers/${id}/report/`,
    method: "post",
  });
};

const share = (id) => {
  return base({
    url: `/offers/${id}/share/`,
    method: "post",
  });
};

const remove = (id) => {
  return base({
    url: `/offers/${id}/remove/`,
    method: "post",
  });
};

const getTodayOffers = () => {
  const q = {
    offer_type: ["qik", "exclusive"],
    min_expire_date: moment().format(),
    view: "trending",
    offset: 0,
    limit: 10,
    status: "published",
    is_homepage_top_module: true,
    is_paid_plan: true,
  };

  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/offers`,
    method: "get",
    params: q,
  });
};

const getSuggestedBrands = () => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/brands/suggested/?limit=5`,
    method: "get",
  });
};

const getOffersByBrandSlug = (brandSlug) => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/brands/slug:${brandSlug}/offers/active/`,
    method: "get",
  });
};

const getLikedOffers = () => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/offers/liked/`,
    method: "get",
  });
};

const getSavedOffers = () => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/offers/saved`,
    method: "get",
  });
};

const getFollowingBrands = () => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/brands/following`,
    method: "get",
  });
};

const getOfferBySlug = async (offerSlug) => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/offers/slug:${offerSlug}/`,
    method: "get",
  });
};

const getBrandBySlug = async (brandSlug) => {
  return base({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/brands/slug:${brandSlug}`,
    method: "get",
  });
};

export default {
  followBrand,
  getBrands,
  unfollowBrand,
  getOffers,
  like,
  unlike,
  save,
  remove,
  getTodayOffers,
  report,
  share,
  getSuggestedBrands,
  getOffersByBrandSlug,
  getLikedOffers,
  getSavedOffers,
  getFollowingBrands,
  getOfferBySlug,
  getBrandBySlug,
};
