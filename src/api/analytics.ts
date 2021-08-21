import base from "./base";

const track = async (
  category: "impression" | "click" | "engagement",
  action: "render" | "click" | "like" | "comment" | "save" | "show" | "follow" | "share",
  offer?: string,
  brand?: string
) => {
  try {
    await base({
      url: "/analytics/track-activity/",
      method: "post",
      data: {
        category: category,
        action: action,
        offer: offer,
        brand: brand,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  track: track,
};
