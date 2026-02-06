import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/order-success",
          "/login",
          "/signup",
          "/cart",
        ],
      },
    ],
    sitemap: "https://www.phoolpatta.com/sitemap.xml",
  };
}
