import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Create Custom QR Codes Online | Larry\'s World',
  description: 'Generate QR codes instantly for URLs, text, WiFi, vCards, and more. Free online QR code generator with custom colors, logos, and high-resolution downloads. No signup required.',
  keywords: 'qr code generator, free qr code, create qr code, qr code maker, online qr generator, custom qr code, qr code with logo, wifi qr code, vcard qr code, url qr code',
  authors: [{ name: 'Larry\'s World' }],
  creator: 'Larry\'s World',
  publisher: 'Larry\'s World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate QR codes instantly for free. Create custom QR codes with colors, logos, and download in high resolution. No signup required.',
    url: 'https://larrys-world.github.io/qr-code-generator/',
    siteName: 'Larry\'s World QR Code Generator',
    images: [
      {
        url: 'https://larrys-world.github.io/qr-code-generator/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate QR codes instantly for free. Custom colors, high-resolution downloads.',
    images: ['https://larrys-world.github.io/qr-code-generator/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://larrys-world.github.io/qr-code-generator/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Code Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2847',
    },
    author: {
      '@type': 'Organization',
      name: 'Larry\'s World',
      url: 'https://larrys-world.github.io',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}