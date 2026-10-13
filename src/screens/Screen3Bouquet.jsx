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
const SpeechBubble = ({ text, side, isLatest }) => (
  <motion.div
    className={`relative bg-cream/95 border-2 border-rose rounded-2xl px-4 py-2.5 shadow-md max-w-[150px] sm:max-w-[175px] ${
      side === 'left' ? 'rounded-tl-sm' : 'rounded-tr-sm'
    }`}
    initial={{ opacity: 0, x: side === 'left' ? -25 : 25, scale: 0.7 }}
    animate={{ 
      opacity: 1, 
      x: 0, 
      scale: isLatest ? [1, 1.05, 1] : 1 
    }}
    transition={{ duration: 0.5, type: 'spring', stiffness: 220 }}
  >
    <p className="font-caveat text-raspberry text-sm sm:text-base text-center leading-tight font-semibold">{text}</p>
    {/* Bubble tail */}
    <div
      className={`absolute top-3.5 w-2.5 h-2.5 bg-cream border-r-2 border-b-2 border-rose transform ${
        side === 'left' ? '-right-1.5 rotate-[-45deg]' : '-left-1.5 rotate-[135deg]'
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

  // Reveal messages one by one
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    if (visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, 1600) // reveals a new message every 1.6s
      return () => clearTimeout(timer)
    }
  }, [visibleCount, messages.length])

  return (
    <div
      className="screen overflow-hidden relative cursor-pointer"
      onClick={() => {
        if (visibleCount < messages.length) {
          setVisibleCount(prev => prev + 1)
        }
      }}
      style={{ background: 'linear-gradient(135deg, #FDE4E8 0%, #F9B8C6 50%, #FDE4E8 100%)' }}
    >
      {/* Lace trim at top */}
      <div
        className="absolute top-0 left-0 right-0 h-6 sm:h-8 z-20 pointer-events-none"
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
      <div className="absolute top-2 left-14 text-xl sm:text-2xl opacity-60 pointer-events-none">🎀</div>
      <div className="absolute top-2 right-24 text-xl sm:text-2xl opacity-60 pointer-events-none">🎀</div>
      <div className="absolute bottom-4 left-4 text-xl sm:text-2xl opacity-40 pointer-events-none">🎀</div>
      <div className="absolute bottom-4 right-4 text-xl sm:text-2xl opacity-40 pointer-events-none">🎀</div>

      {/* Tiny floating hearts */}
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="absolute text-rose text-lg opacity-40 pointer-events-none"
          style={{ left: `${15 + i * 20}%`, top: `${15 + (i % 2) * 55}%` }}
          animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col h-full pt-10 sm:pt-12 pb-4 px-2 max-w-lg mx-auto">
        {/* Header with spacious title and Next button */}
        <div className="flex items-center justify-between pl-12 pr-2 mb-3">
          <motion.h1
            className="font-fredoka font-bold text-xl sm:text-2xl md:text-3xl"
            style={{ color: '#EC5A86' }}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Your Bouquet 💐
          </motion.h1>
          <NextButton onClick={(e) => { e.stopPropagation(); onNext(); }} />
        </div>

        {/* Main layout: speech bubbles around bouquet */}
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-3 px-1 min-h-0">
          {/* Left speech bubbles (indices 0, 2, 4) */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 flex-1 items-end">
            {[0, 2, 4].map(idx => {
              if (idx >= messages.length || idx >= visibleCount) return <div key={idx} className="h-10 sm:h-12" />
              return (
                <SpeechBubble
                  key={idx}
                  text={messages[idx]}
                  side="left"
                  isLatest={idx === visibleCount - 1}
                />
              )
            })}
          </div>

          {/* Bouquet center */}
          <motion.div
            className="flex-shrink-0 w-40 sm:w-48 md:w-56"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Wavy cream frame */}
            <div
              className="bg-cream/85 rounded-3xl p-2 sm:p-2.5 border-4 border-rose shadow-xl"
              style={{ borderRadius: '40% 40% 40% 40% / 30% 30% 30% 30%' }}
            >
              <img src="/images/bouquet.png" alt="Bouquet" className="w-full h-auto drop-shadow-md" />
            </div>
          </motion.div>

          {/* Right speech bubbles (indices 1, 3, 5) */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 flex-1 items-start">
            {[1, 3, 5].map(idx => {
              if (idx >= messages.length || idx >= visibleCount) return <div key={idx} className="h-10 sm:h-12" />
              return (
                <SpeechBubble
                  key={idx}
                  text={messages[idx]}
                  side="right"
                  isLatest={idx === visibleCount - 1}
                />
              )
            })}
          </div>
        </div>

        {/* Hint to tap to see more */}
        {visibleCount < messages.length && (
          <p className="text-center font-caveat text-raspberry/70 text-sm mt-1">
            Tap anywhere to reveal next message ✨
          </p>
        )}

        {/* Washi tape decorations at bottom */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-2 opacity-60">
          {['#F9B8C6', '#A8D4F0', '#F5C26B'].map((color, i) => (
            <div
              key={i}
              className="h-3.5 sm:h-4 w-12 sm:w-16 rounded-sm opacity-70"
              style={{ background: color, transform: `rotate(${i * 3 - 3}deg)` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
