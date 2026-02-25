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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Free QR Code Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create custom QR codes instantly. Generate QR codes for URLs, text, WiFi passwords, 
            contact cards, and more. Download in high resolution PNG or SVG format.
          </p>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Create Your QR Code</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter URL or Text
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com or any text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size: {size}px
                </label>
                <input
                  id="size"
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="errorLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Error Correction Level
                </label>
                <select
                  id="errorLevel"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="darkColor" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="lightColor" className="block text-sm font-medium text-gray-700 mb-1">
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

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">QR Code Preview</h2>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <canvas
                  ref={canvasRef}
                  className={text ? 'block' : 'hidden'}
                />
                {!text && (
                  <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                    Enter text to generate QR code
                  </div>
                )}
              </div>

              {text && (
                <div className="flex gap-4">
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
              )}
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">What is a QR Code?</h2>
            <p className="text-gray-700 mb-4">
              QR (Quick Response) codes are two-dimensional barcodes that can store various types of data. 
              Originally developed in 1994 for the automotive industry in Japan, QR codes have become 
              ubiquitous in our digital world, enabling quick access to websites, contact information, 
              WiFi credentials, and much more.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Popular QR Code Uses</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Website URLs:</strong> Direct users to your website or landing page</li>
              <li><strong>WiFi Access:</strong> Share network credentials without typing passwords</li>
              <li><strong>Contact Cards:</strong> Share vCard information instantly</li>
              <li><strong>Payment Links:</strong> Enable quick mobile payments</li>
              <li><strong>Restaurant Menus:</strong> Contactless menu viewing</li>
              <li><strong>Event Tickets:</strong> Digital ticketing and check-ins</li>
              <li><strong>Product Information:</strong> Link to manuals, reviews, or specifications</li>
              <li><strong>Social Media:</strong> Quick follows and profile sharing</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">How to Use This QR Code Generator</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter your URL, text, or data in the input field</li>
              <li>Adjust the size using the slider (128-512 pixels)</li>
              <li>Choose an error correction level based on your needs</li>
              <li>Customize colors to match your brand (optional)</li>
              <li>Download your QR code as PNG (for print) or SVG (for scaling)</li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Error Correction Levels Explained</h3>
            <p className="text-gray-700 mb-4">
              QR codes have built-in error correction that allows them to be scanned even when partially damaged:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Low (L) - 7%:</strong> Best for clean environments and maximum data capacity</li>
              <li><strong>Medium (M) - 15%:</strong> Default level, good balance of size and reliability</li>
              <li><strong>Quartile (Q) - 25%:</strong> Higher reliability, good for outdoor use</li>
              <li><strong>High (H) - 30%:</strong> Maximum reliability, ideal for industrial environments</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">QR Code Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Test your QR code with multiple devices before printing</li>
              <li>Ensure sufficient contrast between foreground and background colors</li>
              <li>Leave adequate white space (quiet zone) around the QR code</li>
              <li>Use vector format (SVG) for printed materials to ensure quality</li>
              <li>Consider the scanning distance when choosing size</li>
              <li>Use URL shorteners for long web addresses to create simpler QR codes</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">Are the QR codes free to use?</h4>
                <p className="text-gray-700">Yes, all QR codes generated here are completely free for personal and commercial use.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Do QR codes expire?</h4>
                <p className="text-gray-700">No, QR codes don't expire. They will work as long as the content they link to remains available.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">What's the difference between PNG and SVG?</h4>
                <p className="text-gray-700">PNG is a raster format best for digital use, while SVG is a vector format that scales perfectly for print.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Can I track QR code scans?</h4>
                <p className="text-gray-700">The QR code itself doesn't track scans, but you can use URL shorteners with analytics for tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>© 2024 Larry's World. Free QR Code Generator - No signup required.</p>
          <p className="mt-2">
            <a href="https://larrys-world.github.io" className="text-blue-600 hover:underline">
              More Free Tools
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}