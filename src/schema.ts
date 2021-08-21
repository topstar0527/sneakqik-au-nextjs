// normalizr schema definition

// const categorySchema = new schema.Entity("categories");
import { schema } from "normalizr";

export const brand = new schema.Entity("brands", {}, { idAttribute: "slug" });

export const brandList = new schema.Array(brand);

export const user = new schema.Entity("users", {}, { idAttribute: "id" });

export const comment = new schema.Entity("comments", { commentAuthor: user }, { idAttribute: "id" });

export const commentList = new schema.Array(comment);

export const offer = new schema.Entity("offers", { brand: brand, comments: commentList }, { idAttribute: "slug" });

export const offerList = new schema.Array(offer);
