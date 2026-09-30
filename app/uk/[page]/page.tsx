import { notFound } from "next/navigation"
import { AboutPage } from "@/components/about-page"
import { ContactPage } from "@/components/contact-page"
import { GalleryPage } from "@/components/gallery-page"
import { PricingPage } from "@/components/pricing-page"
import { ServicesPage } from "@/components/services-page"
import { pageMetadata, type PageKey } from "@/lib/content"

// An ASCII route segment avoids Next 16's Unicode segment-key encoding bug.
// The exported URLs keep their original Ukrainian spelling.
const pages = {
  "галерея": { key: "gallery", Component: GalleryPage },
  "контакти": { key: "contact", Component: ContactPage },
  "послуги": { key: "services", Component: ServicesPage },
  "про-нас": { key: "about", Component: AboutPage },
  "ціни": { key: "pricing", Component: PricingPage },
} as const

export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys(pages).map(page => ({ page }))
}

type Props = { params: Promise<{ page: string }> }
function getPage(page: string) {
  const entry = pages[decodeURIComponent(page) as keyof typeof pages]
  if (!entry) notFound()
  return entry
}

export async function generateMetadata({ params }: Props) {
  return pageMetadata("uk", getPage((await params).page).key as PageKey)
}

export default async function Page({ params }: Props) {
  const { Component } = getPage((await params).page)
  return <Component locale="uk" />
}
