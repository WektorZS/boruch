import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Roboto_Flex } from 'next/font/google'
import { MotionObserver } from '@/components/motion-observer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const flex = Roboto_Flex({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  axes: ['wdth'],
  variable: '--font-flex',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-mono-tech',
  display: 'swap',
})
const OG_IMAGE = '/images/home/szczecin-myjnia-banner.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://boruchmyjnia.pl'),
  title: {
    default: 'BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin',
    template: `%s | BORUCH Myjnia ${siteConfig.city}`,
  },
  description: siteConfig.description,
  generator: 'v0.app',
  keywords: [
    'myjnia Szczecin',
    'myjnia ręczna Szczecin',
    'detailing Szczecin',
    'powłoka ceramiczna Szczecin',
    'folia PPF Szczecin',
    'pranie tapicerki Szczecin',
    'korekta lakieru Szczecin',
    'PAZIM Plac Rodła',
  ],
  authors: [{ name: siteConfig.owner }],
  alternates: {
    canonical: '/',
    languages: { 'pl-PL': '/', en: '/en', de: '/de', uk: '/uk', 'x-default': '/' },
  },
  openGraph: {
    title: 'BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin',
    description: siteConfig.description,
    url: 'https://boruchmyjnia.pl',
    siteName: siteConfig.name,
    locale: 'pl_PL',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 900, alt: siteConfig.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BORUCH Myjnia Ręczna | Detailing & Pielęgnacja Aut | Szczecin',
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  '@id': 'https://boruchmyjnia.pl/#business',
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  image: `https://boruchmyjnia.pl${OG_IMAGE}`,
  url: 'https://boruchmyjnia.pl',
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: 'od 110 zł',
  founder: { '@type': 'Person', name: siteConfig.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: 'PL',
  },
  areaServed: siteConfig.city,
  sameAs: [siteConfig.bookingUrl],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${flex.variable} ${mono.variable} bg-background`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so reveal styles never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <MotionObserver />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
