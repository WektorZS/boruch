import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PlChrome } from '@/components/pl-chrome'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

const OG_IMAGE = '/images/home/szczecin-myjnia-banner.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://boruchmyjnia.pl'),
  title: {
    // Exact title format verified live on boruchmyjnia.pl's homepage <title>.
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
    languages: { 'pl-PL': '/', en: '/en', de: '/de', uk: '/uk' },
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
  priceRange: '100–1500 zł',
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
  colorScheme: 'light',
  themeColor: '#f9fafb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <PlChrome>
          <SiteHeader />
        </PlChrome>
        <main className="flex-1">{children}</main>
        <PlChrome>
          <SiteFooter />
        </PlChrome>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
