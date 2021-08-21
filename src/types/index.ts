declare global {
  interface Window {
    Chargebee: any;
    a2a: any;
    a2a_config: any;
    gtag: any;
  }
}

export type Country = {
  code: string;
  label: string;
  phone: string;
};

export type State = {
  abbreviation: string;
  capital: string;
  name: string;
  type: string;
};

export type Plan = {
  benefits: string[];
  description: string;
  id: string;
  label: string;
  multi: boolean;
  price: number;
};

export type Category = {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: string;
  image: string;
  imageSize: 2;
  name: string;
  slug: string;
  updatedAt: string;
};

export type BrandBase = {
  business: string;
  category: string | Category;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  facebookUrl: string;
  headerImage: string;
  id: string;
  image: string;
  imageSize: number;
  instagramUrl: string;
  name: string;
  plan: "basic" | "premium" | "multi";
  primaryWebsite: string;
  publicEmail: string;
  publicPhoneNumber: string;
  slug: string;
  tagline: string;
  totalActiveOffers: number;
  totalFollowers: number;
  twitterUrl: string;
  updatedAt: string;
};

export type UserBrand = BrandBase & {
  isFollowed?: boolean;
};

export type MerchantBrand = BrandBase & {
  isPublished: boolean;
  totalClicks: number;
  totalEngagement: number;
  totalFeaturedOffers: number;
  totalImpressions: number;
};

export type OfferBase = {
  brand: string;
  commentsCount: number;
  couponCode: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  excerpt: string;
  expireDate: string | null;
  id: string;
  image: string | undefined;
  isExclusive: boolean | null;
  isFeatured: boolean;
  isFreebie: boolean | null;
  isLiked?: boolean;
  isPrice: boolean;
  isQikOffer: boolean | null;
  isSaved?: boolean;
  likesCount: number;
  offerUrl: string;
  price: number | null;
  publishedDate: string | null;
  savesCount: number;
  sharesCount: number;
  slug: string;
  status: string;
  title: string;
  updatedAt: string;
};

export type BusinessType = {
  abn: string | null;
  address: string;
  businessName: string;
  contactNumber: string;
  contactPersonName: string;
  country: string;
  createdAt: string;
  deletedAt: null | string;
  hostedPageId: string;
  id: string;
  numberOfVisitorsPerMonth: string;
  position: string;
  postcode: string;
  primaryWebsite: string;
  state: string;
  suburb: string;
  updatedAt: string;
};

export type Comment = {
  commentAuthor: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isLiked: boolean | null;
  likesCount: number;
  message: string;
  offer: string;
  parentId: string | null;
  updatedAt: string;
};

export type User = {
  authorId: string;
  deletedAt: string | null;
  id: string;
  image: string | null;
  name: string;
  type: "user" | "brand";
};
