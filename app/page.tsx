'use client'

import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

export default function Home() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const [darkColor, setDarkColor] = useState('#000000')
  const [lightColor, setLightColor] = useState('#FFFFFF')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    generateQRCode()
  }, [text, size, errorLevel, darkColor, lightColor])

  const generateQRCode = async () => {
    if (!text || !canvasRef.current) return

    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      })

      const url = canvasRef.current.toDataURL('image/png')
      setDataUrl(url)
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const downloadPNG = () => {
    if (!dataUrl) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = dataUrl
    link.click()
  }

  const downloadSVG = async () => {
    if (!text) return
    try {
      const svgString = await QRCode.toString(text, {
        type: 'svg',
        width: size,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      })
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = 'qrcode.svg'
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error generating SVG:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">Free QR Code Generator</h1>
        <p className="text-gray-600 text-center mb-8">
          Create QR codes for URLs, text, WiFi, and more. Download in PNG or SVG format.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                Text or URL
              </label>
              <textarea
                id="text"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text, URL, or any data to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Size Selector */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                Size: {size}px
              </label>
              <input
                id="size"
                type="range"
                min="128"
                max="1024"
                step="128"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Error Correction Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Correction Level
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="darkColor" className="block text-sm font-medium text-gray-700 mb-2">
                  Foreground Color
                </label>
                <input
                  id="darkColor"
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="lightColor" className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input
                  id="lightColor"
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        {text && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <canvas
              ref={canvasRef}
              className="mx-auto mb-6"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={downloadPNG}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Download PNG
              </button>
              <button
                onClick={downloadSVG}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Download SVG
              </button>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About QR Codes</h2>
          <p className="text-gray-600 mb-4">
            QR codes (Quick Response codes) are two-dimensional barcodes that can store various types of data.
            They can be scanned by smartphones and other devices to quickly access information, websites, or perform actions.
          </p>
          <h3 className="text-xl font-semibold mb-3">Features of Our QR Code Generator</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Generate QR codes for any text, URL, or data</li>
            <li>Adjustable sizes from 128px to 1024px</li>
            <li>Four error correction levels for different use cases</li>
            <li>Custom colors for foreground and background</li>
            <li>Download in PNG format for immediate use</li>
            <li>Download in SVG format for scalable graphics</li>
            <li>No registration or payment required</li>
            <li>Works on all devices - desktop, tablet, and mobile</li>
          </ul>
        </div>
      </div>
    </main>
  )
}