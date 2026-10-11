import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NextButton } from '../components/SharedUI'
import config from '../config'

// Falling petal
const Petal = ({ style }) => (
  <motion.div
    className="absolute pointer-events-none text-red-400"
    style={{ ...style, fontSize: '12px' }}
    initial={{ y: -20, x: style.left, opacity: 0, rotate: 0 }}
    animate={{ y: '100vh', x: parseFloat(style.left) + 60, opacity: [0, 0.8, 0.8, 0], rotate: 360 }}
    transition={{ duration: 4 + Math.random() * 3, delay: style.delay, repeat: Infinity, ease: 'linear' }}
  >
    <img src="/images/blossom.png" alt="Blossom" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" />
  </motion.div>
)

// Speech bubble
const SpeechBubble = ({ text, side, delay }) => (
  <motion.div
    className={`relative bg-cream border-2 border-rose rounded-2xl px-3 py-2 shadow-sm max-w-[130px] ${
      side === 'left' ? 'rounded-tl-sm' : 'rounded-tr-sm'
    }`}
    initial={{ opacity: 0, x: side === 'left' ? -30 : 30, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
  >
    <p className="font-caveat text-raspberry text-sm text-center leading-tight">{text}</p>
    {/* Bubble tail */}
    <div
      className={`absolute top-4 w-3 h-3 bg-cream border-r-2 border-b-2 border-rose transform ${
        side === 'left' ? '-right-2 rotate-[-45deg]' : '-left-2 rotate-[135deg]'
      }`}
    />
  </motion.div>
)

export default function Screen3Bouquet({ onNext }) {
  const messages = config.bouquetMessages || [
    "Another year, another reason to love you",
    "Life feels sweeter with you",
    "You make every moment special",
    "I choose you every day",
    "My love for you keeps growing",
    "My heart will always choose you",
  ]

  const leftMessages = messages.slice(0, 3)
  const rightMessages = messages.slice(3, 6)

  return (
    <div
      className="screen overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #FDE4E8 0%, #F9B8C6 50%, #FDE4E8 100%)' }}
    >
      {/* Lace trim at top */}
      <div
        className="absolute top-0 left-0 right-0 h-8 z-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 8px 0px, transparent 8px, #FDE4E8 8px),
            radial-gradient(circle at 8px 0px, #F9B8C6 6px, transparent 6px)
          `,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 0',
        }}
      />

      {/* Falling petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Petal key={i} style={{ left: `${10 + i * 11}%`, top: 0, delay: i * 0.7 }} />
      ))}

      {/* Decorative bows */}
      <div className="absolute top-2 left-4 text-2xl opacity-60">🎀</div>
      <div className="absolute top-2 right-16 text-2xl opacity-60">🎀</div>
      <div className="absolute bottom-4 left-4 text-2xl opacity-40">🎀</div>
      <div className="absolute bottom-4 right-4 text-2xl opacity-40">🎀</div>
      {/* Tiny hearts */}
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="absolute text-rose text-lg opacity-40"
          style={{ left: `${15 + i * 20}%`, top: `${10 + (i % 2) * 60}%` }}
          animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col h-full pt-10 pb-4 px-2">
        {/* Title + Next button */}
        <div className="flex items-center justify-between px-4 mb-4">
          <motion.h1
            className="font-fredoka font-bold text-2xl md:text-3xl"
            style={{ color: '#EC5A86' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Your Bouquet 💐
          </motion.h1>
          <NextButton onClick={onNext} />
        </div>

        {/* Main layout: speech bubbles + bouquet */}
        <div className="flex-1 flex items-center justify-center gap-2 px-2 min-h-0">
          {/* Left speech bubbles */}
          <div className="flex flex-col gap-3 flex-1 items-end">
            {leftMessages.map((msg, i) => (
              <SpeechBubble key={i} text={msg} side="left" delay={0.3 + i * 0.4} />
            ))}
          </div>

          {/* Bouquet center */}
          <motion.div
            className="flex-shrink-0 w-36 md:w-48"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Wavy cream frame */}
            <div
              className="bg-cream/80 rounded-3xl p-2 border-4 border-rose shadow-xl"
              style={{ borderRadius: '40% 40% 40% 40% / 30% 30% 30% 30%' }}
            >
              <img src="/images/bouquet.png" alt="Bouquet" className="w-full h-auto drop-shadow-md" />
            </div>
          </motion.div>

          {/* Right speech bubbles */}
          <div className="flex flex-col gap-3 flex-1 items-start">
            {rightMessages.map((msg, i) => (
              <SpeechBubble key={i} text={msg} side="right" delay={0.5 + i * 0.4} />
            ))}
          </div>
        </div>

        {/* Washi tape decorations at bottom */}
        <div className="flex justify-center gap-6 mt-2 opacity-60">
          {['#F9B8C6', '#A8D4F0', '#F5C26B'].map((color, i) => (
            <div
              key={i}
              className="h-4 w-16 rounded-sm opacity-70"
              style={{ background: color, transform: `rotate(${i * 3 - 3}deg)` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
