import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LovebirdsSVG, PaperPlaneSVG } from './SVGIllustrations'

// Floating hearts/sparkles/balloons
const FloatingElement = ({ type, style }) => {
  const emojis = {
    heart: '❤️',
    sparkle: '✨',
    balloon: '🎈',
    star: '⭐',
    confetti: ['🎊', '🎉', '💫'][Math.floor(Math.random() * 3)],
  }

  return (
    <motion.div
      style={style}
      className="absolute pointer-events-none select-none text-xl"
      initial={{ y: '100vh', opacity: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.8, 0.8, 0],
        rotate: [0, 10, -10, 5],
        x: [0, 20, -20, 10],
      }}
      transition={{
        duration: style.duration || 8,
        delay: style.delay || 0,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {emojis[type]}
    </motion.div>
  )
}

export const AnimatedBackground = ({ children, className = '' }) => {
  const elements = React.useMemo(() => [
    ...Array.from({ length: 6 }, (_, i) => ({
      type: 'heart',
      style: { left: `${10 + i * 16}%`, bottom: 0, duration: 7 + i, delay: i * 1.2, fontSize: '16px' }
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      type: 'balloon',
      style: { left: `${5 + i * 25}%`, bottom: 0, duration: 9 + i, delay: i * 2, fontSize: '20px' }
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      type: 'sparkle',
      style: { left: `${8 + i * 20}%`, bottom: 0, duration: 6 + i * 0.5, delay: i * 1.5, fontSize: '14px' }
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'star',
      style: { left: `${15 + i * 35}%`, bottom: 0, duration: 10 + i, delay: i * 3, fontSize: '12px' }
    })),
  ], [])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, #FDE4E8 0%, #F9B8C6 40%, #FDE4E8 70%, #FFF6EC 100%)',
          animation: 'gradientShift 8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Floating elements */}
      {elements.map((el, i) => (
        <FloatingElement key={i} type={el.type} style={el.style} />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

// Persistent decorations: lovebirds + paper plane
export const PersistentDecorations = () => (
  <>
    {/* Lovebirds top-right */}
    <motion.div
      className="fixed top-2 right-2 z-50 w-16 md:w-20"
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <LovebirdsSVG className="w-full h-auto drop-shadow-md" />
    </motion.div>

    {/* Paper plane bottom-left */}
    <motion.div
      className="fixed bottom-4 left-2 z-50 w-14 md:w-18"
      animate={{
        y: [0, -12, 0],
        x: [0, 5, 0],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <PaperPlaneSVG className="w-full h-auto drop-shadow-md" />
      {/* Heart dotted trail */}
      <svg className="absolute -top-8 -left-2 w-32 h-24" viewBox="0 0 100 80" fill="none">
        <path
          d="M10 70 Q30 40 60 20 Q80 10 90 30"
          stroke="#EC5A86"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          fill="none"
          opacity="0.5"
        />
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
          const x = 10 + t * 80
          const y = 70 - t * 50 + (t - 0.5) ** 2 * 30
          return <text key={i} x={x} y={y} fontSize="6" fill="#EC5A86" opacity={0.3 + t * 0.4}>♥</text>
        })}
      </svg>
    </motion.div>
  </>
)

// Music toggle button
export const MusicToggle = ({ isPlaying, onToggle }) => (
  <motion.button
    className="fixed top-3 left-3 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-base sm:text-lg border border-rose shadow-md"
    onClick={onToggle}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={isPlaying ? 'Mute music' : 'Play music'}
    title={isPlaying ? 'Mute' : 'Play music'}
  >
    {isPlaying ? '🎵' : '🔇'}
  </motion.button>
)

// Confetti button effect hook
export const useConfetti = () => {
  const fire = async (options = {}) => {
    const confetti = (await import('canvas-confetti')).default
    confetti({
      particleCount: options.count || 100,
      spread: options.spread || 70,
      origin: options.origin || { x: 0.5, y: 0.6 },
      colors: options.colors || ['#EC5A86', '#F9B8C6', '#F5C26B', '#A8D4F0', '#FDE4E8'],
      shapes: options.shapes || ['circle', 'square'],
      ...options,
    })
  }

  const fireHearts = async () => {
    const confetti = (await import('canvas-confetti')).default
    // Simulate hearts with emoji particles is not natively supported,
    // so use pink/red confetti bursts
    const colors = ['#EC5A86', '#A3123F', '#F9B8C6', '#FDE4E8']
    confetti({ particleCount: 50, spread: 60, origin: { x: 0.3, y: 0.5 }, colors })
    setTimeout(() => confetti({ particleCount: 50, spread: 60, origin: { x: 0.7, y: 0.5 }, colors }), 200)
    setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { x: 0.5, y: 0.3 }, colors, startVelocity: 50 }), 400)
  }

  const fireworks = async () => {
    const confetti = (await import('canvas-confetti')).default
    const colors = ['#EC5A86', '#F5C26B', '#A8D4F0', '#FDE4E8', '#A3123F']
    const fire = (x, y) => confetti({ particleCount: 60, spread: 100, origin: { x, y }, colors, startVelocity: 60 })
    fire(0.5, 0.5)
    setTimeout(() => fire(0.2, 0.3), 300)
    setTimeout(() => fire(0.8, 0.3), 600)
    setTimeout(() => fire(0.3, 0.7), 900)
    setTimeout(() => fire(0.7, 0.7), 1200)
    setTimeout(() => fire(0.5, 0.2), 1500)
  }

  return { fire, fireHearts, fireworks }
}

// Next button component
export const NextButton = ({ onClick, label = 'Next →', className = '' }) => (
  <motion.button
    className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-cream border-2 border-rose font-fredoka font-semibold text-base sm:text-lg text-raspberry cursor-pointer shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose flex items-center gap-2 ${className}`}
    onClick={onClick}
    whileHover={{ scale: 1.06, y: -1 }}
    whileTap={{ scale: 0.94 }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <span>{label}</span>
  </motion.button>
)
