import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"

import { MotionObserver } from "@/components/motion-observer"
import { GlobalOverlays } from "@/components/global-overlays"
import { siteConfig } from "@/lib/site-config"

import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
})

const OG_IMAGE = "/images/home/szczecin-myjnia-banner.png"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.sourceUrl),

  title: {
    default: "BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin",
    template: `%s | BORUCH Myjnia ${siteConfig.city}`,
  },

  description: siteConfig.description,

  keywords: [
    "myjnia Szczecin",
    "myjnia ręczna Szczecin",
    "detailing Szczecin",
    "powłoka ceramiczna Szczecin",
    "folia PPF Szczecin",
    "pranie tapicerki Szczecin",
    "korekta lakieru Szczecin",
    "PAZIM Plac Rodła",
  ],

  authors: [{ name: siteConfig.owner }],

  alternates: {
    canonical: "/",
    languages: {
      "pl-PL": "/",
      en: "/en/",
      de: "/de/",
      uk: "/uk/",
      "x-default": "/",
    },
  },

  openGraph: {
    title: "BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin",
    description: siteConfig.description,
    url: siteConfig.sourceUrl,
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 900,
        alt: siteConfig.legalName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin",
    description: siteConfig.description,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoWash"],
  "@id": `${siteConfig.sourceUrl}/#business`,

  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,

  image: `${siteConfig.sourceUrl}${OG_IMAGE}`,
  url: siteConfig.sourceUrl,

  telephone: siteConfig.phone,
  email: siteConfig.email,

  priceRange: "od 110 zł",

  founder: {
    "@type": "Person",
    name: siteConfig.owner,
  },

  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: "PL",
  },

  areaServed: siteConfig.city,

  sameAs: [
    siteConfig.bookingUrl,
    "https://www.facebook.com/Boruch-Myjnia-101966125989872",
    "https://www.instagram.com/boruchmyjnia/",
  ],
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080808",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      className={`${outfit.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/roboto-flex-latin-full-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        {children}

        <MotionObserver />
        <GlobalOverlays />
      </body>
    </html>
  )
}