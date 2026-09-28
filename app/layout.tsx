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

export const metadata: Metadata = {
  metadataBase: new URL('https://boruchmyjnia.pl'),
  title: {
    default: `${siteConfig.legalName} — ${siteConfig.tagline} | ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  generator: 'v0.app',
  keywords: ['myjnia Szczecin', 'detailing Szczecin', 'powłoka ceramiczna', 'folia PPF', 'pranie tapicerki'],
  alternates: {
    canonical: '/',
    languages: { 'pl-PL': '/', en: '/en', de: '/de', uk: '/uk' },
  },
  openGraph: {
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: 'https://boruchmyjnia.pl',
    siteName: siteConfig.name,
    locale: 'pl_PL',
    type: 'website',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  name: siteConfig.legalName,
  image: 'https://boruchmyjnia.pl/images/home/szczecin-myjnia-banner.png',
  url: 'https://boruchmyjnia.pl',
  telephone: siteConfig.phone,
  email: siteConfig.email,
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
