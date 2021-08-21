/* eslint-disable @typescript-eslint/indent */
import moment from "moment";
import { NextPageContext } from "next";

import base from "api/base";

const createSitemap = (brands, offers) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${brands
        .map((brand) => {
          return `
                  <url>
                      <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}/${brand.slug}`}</loc>
                      <lastmod>${`${brand.updatedAt}`}</lastmod>
                  </url>
              `;
        })
        .join("")}
        ${offers
          .map((offer) => {
            return `
                    <url>
                        <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}/offers/${offer.slug}`}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>
`;

const SiteMap = () => {
  return null;
};

SiteMap.getInitialProps = async ({ res }: NextPageContext) => {
  if (res) {
    const { data: brands } = await base({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/brands/suggested`,
      method: "get",
    });

    const q = {
      min_expire_date: moment().format(),
      max_published_date: moment().endOf("day").format(),
      offset: 0,
      status: "published",
    };

    const { data: offers } = await base({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/offers`,
      method: "get",
      params: q,
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap(brands, offers));
    res.end();
  }
};

export default SiteMap;
