import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatedBackground, useConfetti } from '../components/SharedUI'
import config from '../config'

export default function Screen0({ onStart }) {
  const { fire } = useConfetti()

  const handleStart = async () => {
    await fire({ count: 150, spread: 100, origin: { x: 0.5, y: 0.6 }, startVelocity: 45 })
    onStart()
  }

  return (
    <AnimatedBackground className="screen bg-watercolor">
      {/* Background overlay for darker romantic feel */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, rgba(163,18,63,0.4) 0%, rgba(236,90,134,0.3) 40%, rgba(253,228,232,0.1) 100%)' }}
      />

      {/* Floating elements */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${Math.random() * 90 + 5}%`, bottom: '-5%' }}
          animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{ duration: 6 + Math.random() * 6, delay: Math.random() * 5, repeat: Infinity, ease: 'linear' }}
        >
          <span style={{ fontSize: `${12 + Math.random() * 16}px` }}>
            {['🎈', '🎉', '✨', '❤️', '🎊', '💕', '⭐'][Math.floor(Math.random() * 7)]}
          </span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Gift/balloon icon */}
        <motion.div
          className="text-8xl mb-6"
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎁
        </motion.div>

        {/* Sparkle decorations */}
        <motion.div
          className="text-4xl absolute"
          style={{ top: '15%', right: '15%' }}
          animate={{ scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="text-3xl absolute"
          style={{ top: '20%', left: '12%' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          💕
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-fredoka font-bold text-4xl md:text-5xl text-white mb-3"
          style={{ textShadow: '0 2px 20px rgba(163,18,63,0.5)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Happy Birthday,
          <br />
          <span className="text-gold" style={{ color: '#F5C26B' }}>{config.partnerName}! 🎉</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-quicksand text-lg md:text-xl text-white/90 mb-10"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Tap to start your surprise 🎀
        </motion.p>

        {/* Tap button */}
        <motion.button
          onClick={handleStart}
          className="relative px-10 py-4 rounded-full text-raspberry font-fredoka font-bold text-xl shadow-2xl cursor-pointer"
          style={{ background: '#FFF6EC', border: '3px solid #F9B8C6' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(163,18,63,0.35)' }}
          whileTap={{ scale: 0.92 }}
          aria-label="Start the surprise"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Open my surprise 💖
          </motion.span>
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-rose"
            animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>

        {/* Date */}
        <motion.p
          className="font-dancing text-white/70 mt-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {config.birthdayDate} 🌸
        </motion.p>
      </div>
    </AnimatedBackground>
  )
}
