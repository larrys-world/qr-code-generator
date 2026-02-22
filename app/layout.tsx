import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Create QR Codes Online',
  description: 'Generate QR codes instantly for free. Create QR codes for URLs, text, WiFi, and more. Download in PNG or SVG format with custom colors and sizes.',
  keywords: 'qr code generator, free qr code, create qr code, qr code maker, online qr generator',
  openGraph: {
    title: 'Free QR Code Generator - Create QR Codes Online',
    description: 'Generate QR codes instantly for free. Download in PNG or SVG format.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}