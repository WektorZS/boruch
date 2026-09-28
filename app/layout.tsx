import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
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
  openGraph: {
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: 'https://boruchmyjnia.pl',
    siteName: siteConfig.name,
    locale: 'pl_PL',
    type: 'website',
  },
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
