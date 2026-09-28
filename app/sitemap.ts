import type { MetadataRoute } from "next"
import { myjniaNav, detailingNav } from "@/lib/site-config"

const BASE_URL = "https://boruchmyjnia.pl"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/o-nas", "/uslugi", "/cennik", "/galeria", "/kontakt", "/booksy", "/en", "/de", "/uk"]

  const serviceRoutes = [...myjniaNav, ...detailingNav].map((item) => item.href)

  const allRoutes = [...staticRoutes, ...serviceRoutes]

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/uslugi" || route === "/cennik" ? 0.9 : 0.7,
  }))
}
