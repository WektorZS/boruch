import type { MetadataRoute } from "next"
import { myjniaNav, detailingNav } from "@/lib/site-config"
import { SITE_URL, alternatesFor, canonicalPath, localeOrder, routes, type PageKey } from "@/lib/content"

export const dynamic = "force-static"

const BASE_URL = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = localeOrder.flatMap((locale) => Object.values(routes[locale]))

  const serviceRoutes = [...myjniaNav, ...detailingNav].map((item) => item.href)

  const allRoutes = Array.from(new Set([...coreRoutes, "/booksy", ...serviceRoutes]))

  return allRoutes.map((route) => {
    const page = Object.entries(routes.pl).find(([key]) => localeOrder.some(locale => routes[locale][key as PageKey] === route))?.[0] as PageKey | undefined
    return ({
    url: `${BASE_URL}${canonicalPath(route)}`,
    ...(page ? { alternates: { languages: Object.fromEntries(Object.entries(alternatesFor(page)).map(([locale, href]) => [locale, `${BASE_URL}${href}`])) } } : {}),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/uslugi" || route === "/cennik" ? 0.9 : 0.7,
  })})
}
