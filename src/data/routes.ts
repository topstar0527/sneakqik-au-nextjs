export type Route = {
  auth?: string[];
  path?: string;
};

export const hasPermission = (route: Route, userType: string) => {
  if (route.auth && route.auth.indexOf(userType) > -1) return true;
  return false;
};

export const routes: Route[] = [
  {
    path: "/",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/foruser",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/home",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/register",
    auth: ["guest"],
  },
  {
    path: "/create-new-password",
    auth: ["guest"],
  },
  {
    path: "/verify-email",
    auth: ["guest"],
  },
  {
    path: "/brand",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/[brandSlug]",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/brands/[brandSlug]",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/offers/[offerSlug]",
    auth: ["guest", "customer", "merchant"],
  },
  //user pages
  {
    path: "/personalize",
    auth: ["customer", "merchant"],
  },
  {
    path: "/profile",
    auth: ["customer", "merchant"],
  },
  {
    path: "/settings",
    auth: ["customer", "merchant"],
  },
  {
    path: "/settings/general",
    auth: ["customer", "merchant"],
  },
  {
    path: "/settings/login-security",
    auth: ["customer", "merchant"],
  },
  {
    path: "/settings/news-feed-preferences",
    auth: ["customer", "merchant"],
  },
  {
    path: "/settings/notifications",
    auth: ["customer", "merchant"],
  },
  // merchant register
  {
    path: "/merchant/login",
    auth: ["guest"],
  },
  {
    path: "/merchant/register",
    auth: ["guest"],
  },
  {
    path: "/merchant/verify-email",
    auth: ["guest"],
  },
  {
    path: "/merchant/onboarding",
    auth: ["merchant"],
  },
  {
    path: "/merchant/brands/",
    auth: ["merchant"],
  },
  {
    path: "/merchant/brands/draft",
    auth: ["merchant"],
  },
  {
    path: "/merchant/brands/[brandSlug]",
    auth: ["merchant"],
  },
  //merchant settings pages
  {
    path: "/merchant/settings",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/general",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/login-security",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/brands",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/brands/[brandSlug]",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/subscription",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/subscription/billing-details",
    auth: ["merchant"],
  },
  {
    path: "/merchant/settings/notifications",
    auth: ["merchant"],
  },
  //terms paths
  {
    path: "/about",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/faq",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/privacy-terms",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/style-guide",
    auth: ["guest", "customer", "merchant"],
  },
  {
    path: "/contact",
    auth: ["guest", "customer", "merchant"],
  },
];

export const merchantSettingsRoutes = [
  { name: "General", url: "/merchant/settings/general", childUrls: [] },
  { name: "Login & Security", url: "/merchant/settings/login-security", childUrls: [] },
  {
    name: "Your brand/store page info",
    url: "/merchant/settings/brands",
    childUrls: ["/merchant/settings/brands/[brandSlug]"],
  },
  {
    name: "Subscription",
    url: "/merchant/settings/subscription",
    childUrls: ["/merchant/settings/subscription/billing-details"],
  },
  { name: "Notifications", url: "/merchant/settings/notifications", childUrls: [] },
];

export const customerSettingsRoutes = [
  { name: "General", url: "/settings/general" },
  { name: "Login & Security", url: "/settings/login-security" },
  { name: "News Feed Preferences", url: "/settings/news-feed-preferences" },
  { name: "Notifications", url: "/settings/notifications" },
];

export const mobileDrawerMenus = [
  { name: "Home", url: "/", childUrls: [] },
  { name: "Top Coupons", url: "/?view=trending&type=coupon", childUrls: [] },
  { name: "For Businesses", url: "/business/forbusinesses.html", childUrls: [] },
  { name: "About Us", url: "/about", childUrls: [] },
  //{ name: "Get Help", url: "/help", childUrls: [] },
  { name: "Terms & Privacy", url: "/privacy-terms", childUrls: [] },
];
