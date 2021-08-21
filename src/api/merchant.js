import { convertToFormData } from "utils";

import base from "./base";

const createBrand = (data) => {
  return base({
    url: "/brands/",
    method: "post",
    data: data,
  });
};

const updateBrand = (data) => {
  return base({
    url: `/brands/${data.id}/`,
    method: "patch",
    data: convertToFormData(data),
  });
};

const getBrandById = (brandId) => {
  return base({
    url: `/brands/${brandId}/`,
    method: "get",
  });
};

const getOffers = (brandId) => {
  return base({
    url: `/brands/${brandId}/offers/`,
    method: "get",
  });
};

const createOffer = (data) => {
  return base({
    url: `/offers/`,
    method: "post",
    data: convertToFormData(data),
  });
};

const updateOffer = (data) => {
  return base({
    url: `/offers/${data.id}/`,
    method: "patch",
    data: convertToFormData(data),
  });
};

const deleteOffer = (id) => {
  return base({
    url: `/offers/${id}/`,
    method: "delete",
  });
};

const featureOffer = (id) => {
  return base({
    url: `/offers/${id}/feature/`,
    method: "post",
  });
};

const unFeatureOffer = (id) => {
  return base({
    url: `/offers/${id}/unfeature/`,
    method: "post",
  });
};

const getSubscriptionPlans = () => {
  return base({
    url: "/chargebee/plans/",
    method: "get",
  });
};

const updateSubscription = (data) => {
  return base({
    url: `/chargebee/update-subscription/`,
    method: "post",
    data: convertToFormData(data),
  });
};

const getChargebeeInvoices = () => {
  return base({
    url: "/chargebee/invoices/",
    method: "get",
  });
};

const cancelSubscription = () => {
  return base({
    url: "/chargebee/cancel-subscription/",
    method: "post",
  });
};

const reactivateSubscription = () => {
  return base({
    url: "/chargebee/reactivate-subscription/",
    method: "post",
  });
};

export default {
  createBrand,
  updateBrand,
  getBrandById,
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  featureOffer,
  unFeatureOffer,
  getSubscriptionPlans,
  updateSubscription,
  getChargebeeInvoices,
  cancelSubscription,
  reactivateSubscription,
};
