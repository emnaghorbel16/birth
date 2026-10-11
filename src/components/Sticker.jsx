import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Sticker({ 
  src, 
  alt = "Sticker", 
  className = '', 
  fallback = '✨', 
  style = {}, 
  forceRestart = false,
  // Animation presets
  float = false,      // gentle up/down float
  bounce = false,     // springy bounce on mount
  pulse = false,      // scale pulse loop
  spin = false,       // slow rotation loop
  wiggle = false,     // wiggle/shake loop
}) {
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setError(false)
    const finalSrc = forceRestart ? `${src}?t=${Date.now()}` : src
    setImgSrc(finalSrc)
  }, [src, forceRestart])

  // Build looping animate props
  const loopAnimate = {
    ...(float  ? { y: [0, -10, 0] } : {}),
    ...(pulse  ? { scale: [1, 1.08, 1] } : {}),
    ...(spin   ? { rotate: [0, 8, -8, 0] } : {}),
    ...(wiggle ? { rotate: [-4, 4, -4, 4, -4, 0] } : {}),
  }
  const hasLoop = float || pulse || spin || wiggle
  const loopTransition = {
    duration: wiggle ? 0.6 : 3,
    repeat: Infinity,
    ease: 'easeInOut',
    repeatDelay: wiggle ? 2 : 0,
  }

  // Mount animation
  const mountProps = bounce ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 350, damping: 14 },
  } : {}

  return (
    <motion.div 
      className={`flex items-center justify-center relative select-none ${className}`} 
      style={style}
      whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0], transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      {...mountProps}
    >
      {/* Continuous loop wrapper */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={hasLoop ? loopAnimate : { y: [0, -5, 0] }}
        transition={hasLoop ? loopTransition : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {error ? (
          <span className="text-5xl drop-shadow-md select-none">{fallback}</span>
        ) : (
          <img
            src={imgSrc}
            alt={alt}
            className="w-full h-full object-contain pointer-events-none"
            style={{ 
              imageRendering: 'auto', 
              background: 'transparent',
              filter: 'drop-shadow(0px 8px 18px rgba(163, 18, 63, 0.22))' 
            }}
            onError={() => {
              console.warn(`GIF missing: ${src}`)
              setError(true)
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
