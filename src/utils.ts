import _ from "lodash";
import qs from "qs";

import { VIEWS, filters } from "data/demo";
import { OfferBase, UserBrand } from "types";

/* eslint-disable no-useless-escape */
export const convertToFormData = (obj: object) => {
  const formData = new FormData();

  for (const key in obj) {
    formData.append(key, obj[key]);
  }

  return formData;
};

export const convertArrayToObject = (arr: any[]) => {
  const obj = {};

  arr.forEach((item) => (obj[item.id] = item));

  return obj;
};

// Shorten a string to less than maxLen characters without truncating words.
export const shorten = (str: string, maxLen: number, separator = " ") => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen)).concat("...");
};

// https://gist.github.com/mathewbyrne/1280286
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const sleep = (ms) => {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, ms);
  });
};

export const mergeWithCustomizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export function getCroppedImg(image: HTMLImageElement, crop, fileName: string): Promise<File> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("2d context identifier is not supported!");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject();
        else {
          const file = new File([blob], `${fileName}.jpg`, { type: "image/jpeg" });
          resolve(file);
        }
      },
      "image/jpeg",
      1
    );
  });
}

// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
// Remove blank attributes from an Object

export const clean = (obj: Record<string, any>) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && _.isPlainObject(obj[key])) {
      newObj[key] = clean(obj[key]); // recurse
    } else if (obj[key] != null) {
      newObj[key] = obj[key]; // copy value
    }
  });

  return newObj;
};

type Query = {
  category?: string[];
  type?: string;
  view?: string;
};

export const extractQuery = (q) => {
  const { view = "trending", category = [], type = "all" } = q;

  const query: Query = {};

  if (view && typeof view === "string" && VIEWS.includes(view)) {
    query.view = view;
  }

  if (type && typeof type === "string" && filters.types.find((t) => type === t.value)) {
    query.type = type;
  }

  if (category) {
    if (typeof category === "string") {
      query.category = [category];
    }

    if (Array.isArray(category)) {
      query.category = category;
    }
  }

  return query;
};

export const generateShareLink = (type: "offer" | "brand", data: OfferBase | UserBrand) => {
  const query = qs.stringify({
    type: type,
    id: data.id,
    slug: data.slug,
  });

  if (type === "offer") {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/offers/${data.slug}?${query}`;
  }

  if (type === "brand") {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/${data.slug}?${query}`;
  }
};

export const stripQueryStringAndHashFromPath = (url: string) => {
  return url.split("?")[0].split("#")[0];
};

export const generateOfferUrl = (slug = "") => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/offers/${slug}`;
};

export const generateBrandUrl = (slug = "") => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`;
};

export const byCreatedAt = (a, b) => {
  // Order offers by field `createdAt`
  if (new Date(a.createdAt) > new Date(b.createdAt)) {
    return -1;
  } else {
    return 1;
  }
};
