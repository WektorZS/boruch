import type { MetadataRoute } from "next"
import { myjniaNav, detailingNav } from "@/lib/site-config"
import { localeOrder, routes } from "@/lib/content"

export const dynamic = "force-static"

const BASE_URL = "https://boruchmyjnia.pl"

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = localeOrder.flatMap((locale) => Object.values(routes[locale]))

  const serviceRoutes = [...myjniaNav, ...detailingNav].map((item) => item.href)

  const allRoutes = Array.from(new Set([...coreRoutes, "/booksy", ...serviceRoutes]))

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/uslugi" || route === "/cennik" ? 0.9 : 0.7,
  }))
}
