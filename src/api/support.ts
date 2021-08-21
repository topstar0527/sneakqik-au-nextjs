import { convertToFormData } from "utils";

import base from "./base";

const contactUs = (data) => {
  return base({
    url: `/contact/`,
    method: "post",
    data: convertToFormData(data),
  });
};

export default {
  contactUs,
};
