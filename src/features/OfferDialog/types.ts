import * as Yup from "yup";

export const OfferFormSchema = Yup.object({
  title: Yup.string().required("Title is required").max(90, "Maximum 90 characters"),
  description: Yup.string().required("Description is required"),
  offerUrl: Yup.string().url("Please enter a valid offer url.").required("Offer url is required."),
  // category: Yup.string().required("Category is required"),
  expireDate: Yup.string().required("Expiry date is required."),
  image: Yup.mixed(),
  couponCode: Yup.string(),
  price: Yup.string().nullable(),
  isDraft: Yup.bool(),
  isFreebie: Yup.bool(),
  isExclusive: Yup.bool(),
  isQikOffer: Yup.bool(),
  isPrice: Yup.bool(),
  publishedDate: Yup.string().nullable(),
  status: Yup.string().nullable(),
}).required();

export type OfferFormType = Yup.InferType<typeof OfferFormSchema>;

export const OfferFormInitValues: OfferFormType = {
  title: "",
  description: "",
  offerUrl: "",
  expireDate: "",
  image: null,
  couponCode: "",
  price: "",
  isDraft: false,
  isFreebie: false,
  isExclusive: false,
  isQikOffer: false,
  isPrice: false,
  publishedDate: null,
  status: "draft",
};
