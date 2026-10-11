import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import QRCodeStyling from 'qr-code-styling'

const QR_URL = typeof window !== 'undefined' ? window.location.origin : 'https://your-deployed-url.netlify.app'

export default function QRPage() {
  const qrRef = useRef(null)
  const qrCode = useRef(null)

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 280,
      height: 280,
      type: 'svg',
      data: QR_URL,
      dotsOptions: {
        color: '#D6336C',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        color: '#A3123F',
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        color: '#EC5A86',
        type: 'dot',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
      // Heart shape via custom SVG mask is complex, use square with pink dots
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    })

    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qrCode.current.append(qrRef.current)
    }
  }, [])

  const handleDownload = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: 'birthday-love-qr', extension: 'png' })
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(135deg, #FDE4E8, #F9B8C6, #FDE4E8)' }}
    >
      <motion.div
        className="flex flex-col items-center gap-6 max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="font-fredoka font-bold text-3xl text-hotpink">Share the Surprise 💕</h1>
          <p className="font-quicksand text-raspberry/70 mt-1 text-sm">
            Send this QR code to your partner with the caption "Open when alone"
          </p>
        </div>

        {/* Heart-shaped QR container */}
        <div className="relative">
          {/* Heart shape clip using CSS */}
          <div
            className="relative overflow-hidden shadow-2xl"
            style={{
              width: '280px',
              height: '280px',
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div ref={qrRef} className="flex items-center justify-center" />
          </div>

          {/* Decorative hearts around */}
          {['top-0 -left-4', 'top-0 -right-4', 'bottom-0 -left-4', 'bottom-0 -right-4'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} text-2xl`}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              💕
            </motion.div>
          ))}
        </div>

        {/* URL display */}
        <div className="bg-cream/80 border-2 border-rose rounded-xl px-4 py-2 w-full text-center">
          <p className="font-quicksand text-raspberry/60 text-xs mb-1">Points to:</p>
          <p className="font-quicksand text-raspberry font-semibold text-sm break-all">{QR_URL}</p>
        </div>

        {/* WhatsApp caption hint */}
        <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl px-4 py-3 w-full text-center">
          <p className="font-caveat text-lg" style={{ color: '#128C7E' }}>
            WhatsApp caption: "Open when alone 🎁❤️"
          </p>
        </div>

        {/* Download button */}
        <motion.button
          onClick={handleDownload}
          className="btn-pill-pink w-full text-center"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Download QR code as PNG"
        >
          📥 Download QR Code (PNG)
        </motion.button>

        {/* Go to experience */}
        <a
          href="/"
          className="font-quicksand text-raspberry/60 text-sm hover:text-raspberry transition-colors underline"
        >
          ← Go to the experience
        </a>
      </motion.div>
    </div>
  )
}
