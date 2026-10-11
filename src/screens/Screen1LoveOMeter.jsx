import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedBackground, useConfetti, NextButton } from '../components/SharedUI'
import Sticker from '../components/Sticker'
const getMessage = (value) => {
  if (value === 0) return "Birthday habibi, how much do you love me? 💕"
  if (value <= 25) return "Ouch… on your birthday? 💔"
  if (value <= 60) return "Half? Seriously?"
  if (value < 500) return "Aww, that's more like it!"
  return "Correct answer! 🎉"
}

// Map value to GIF
const getMascotSrc = (value) => {
  if (value < 50) return '/stickers/mascot-sad.gif'
  if (value < 80) return '/stickers/mascot-meh.gif'
  if (value < 500) return '/stickers/mascot-happy.gif'
  return '/stickers/mascot-ecstatic.gif'
}

// Fallback emoji per mood
const getMascotFallback = (value) => {
  if (value < 50) return '😿'
  if (value < 80) return '😼'
  if (value < 500) return '😸'
  return '😻'
}

// Preload all mascot GIFs to avoid flicker on swap
const PRELOAD_STICKERS = [
  '/stickers/mascot-sad.gif',
  '/stickers/mascot-meh.gif',
  '/stickers/mascot-happy.gif',
  '/stickers/mascot-ecstatic.gif',
]

// Shared arc math — same direction as needle
// value=0 → LEFT (−9 o’clock), value=500 → RIGHT (3 o’clock), sweeps through TOP
const getArcPoint = (cx, cy, r, value) => {
  const angleDeg = (value / 500) * 180 - 180
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// SVG arc path from one value to another (upper semicircle, clockwise = sweep 1)
const segmentPath = (cx, cy, r, fromVal, toVal) => {
  const s = getArcPoint(cx, cy, r, fromVal)
  const e = getArcPoint(cx, cy, r, toVal)
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`
}

// 5 color bands (light pink → deep raspberry, left to right) with gaps
const COLOR_BANDS = [
  { color: '#FADDE5', from: 0, to: 96 },
  { color: '#F9B8C6', from: 101, to: 197 },
  { color: '#F0809D', from: 202, to: 298 },
  { color: '#D94074', from: 303, to: 399 },
  { color: '#A3123F', from: 404, to: 500 },
]

// Compute needle tip coordinates directly from value — no spring, no lag
const getNeedleCoords = (cx, cy, r, value) => {
  const angleDeg = (value / 500) * 180 - 180
  const rad = (angleDeg * Math.PI) / 180
  const tipLen = r - 8
  return {
    x2: cx + tipLen * Math.cos(rad),
    y2: cy + tipLen * Math.sin(rad),
  }
}

export default function Screen1LoveOMeter({ onNext }) {
  const [value, setValue] = useState(0)
  const [locked, setLocked] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showMascotMsg, setShowMascotMsg] = useState(false)
  const easterEggTimer = useRef(null)
  const { fireHearts } = useConfetti()

  const cx = 110, cy = 100, r = 70

  // Needle tip — computed directly from value, zero delay
  const needle = getNeedleCoords(cx, cy, r, value)

  const handleSlider = (e) => {
    if (locked) return
    const v = parseInt(e.target.value)
    setValue(v)

    // Easter egg: linger < 100 for 3 seconds
    clearTimeout(easterEggTimer.current)
    if (v < 100 && v > 0) {
      easterEggTimer.current = setTimeout(() => {
        setShowMascotMsg(true)
        setTimeout(() => setShowMascotMsg(false), 3000)
      }, 3000)
    }

    if (v === 500) {
      setLocked(true)
      setTimeout(() => {
        setShowNext(true)
        fireHearts()
      }, 600)
    }
  }

  return (
    <AnimatedBackground className="screen">
      {/* Background Decorations (Cute & subtle stickers) */}
      <motion.div
        className="absolute top-4 right-3 sm:top-6 sm:right-6 w-16 sm:w-20 md:w-24 opacity-80 z-0 cursor-pointer pointer-events-auto"
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, opacity: 1 }}
      >
        <Sticker src="/stickers/lovebirds.gif" alt="Lovebirds" className="w-full h-auto drop-shadow-md" />
      </motion.div>
      <motion.div
        className="absolute bottom-6 left-3 sm:bottom-10 sm:left-6 w-16 sm:w-22 md:w-28 opacity-80 z-0 cursor-pointer pointer-events-auto"
        animate={{ y: [0, 8, 0], x: [0, 4, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, opacity: 1 }}
      >
        <Sticker src="/stickers/paperplane.gif" alt="Paper plane" fallback="✈️" className="w-full h-auto drop-shadow-md" />
      </motion.div>

      {/* Preload all mascot GIFs */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        {PRELOAD_STICKERS.map(s => <link key={s} rel="preload" as="image" href={s} />)}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full pt-4 pb-4 px-4 max-w-lg mx-auto">

        {/* Mascot */}
        <div className="h-36 sm:h-44 md:h-48 flex items-end justify-center mb-1">
          <AnimatePresence mode="popLayout">
            {value >= 0 && (
              <motion.div
                key={getMascotSrc(value)}
                initial={{ opacity: 0, y: 25, scale: 0.75 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75, y: -20 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="relative flex flex-col items-center w-36 sm:w-44 md:w-48"
              >
                <Sticker
                  src={getMascotSrc(value)}
                  fallback={getMascotFallback(value)}
                  className="w-full drop-shadow-xl"
                  pulse={value === 500}
                />
                {showMascotMsg && (
                  <motion.div
                    className="absolute -top-8 -right-16 bg-cream border-2 border-rose rounded-2xl rounded-bl-none px-3 py-2 z-20 w-[145px] shadow-lg"
                    initial={{ opacity: 0, scale: 0.7, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                  >
                    <p className="font-quicksand text-xs text-raspberry font-semibold">
                      Try again 😤 It's your birthday, be generous!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message + percentage */}
        <div className="text-center flex flex-col items-center gap-0.5 h-24 justify-center my-1">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={getMessage(value)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <p className="font-quicksand font-semibold text-base sm:text-lg md:text-xl text-raspberry mb-1">
                {getMessage(value)}
              </p>
              {showNext ? (
                <div className="mt-1">
                  <NextButton onClick={onNext} label="Next →" />
                </div>
              ) : (
                <p className="font-fredoka font-bold text-3xl sm:text-4xl md:text-5xl text-raspberry">
                  {value}%
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Grand Arc Gauge — Magnified & Highlighted */}
        <div className="relative w-72 sm:w-80 md:w-[360px] h-44 sm:h-48 md:h-52 filter drop-shadow-[0_10px_20px_rgba(236,90,134,0.25)]">
          <svg viewBox="0 0 280 155" className="w-full h-full overflow-visible">
            {/* Soft decorative outer glow arc */}
            <path
              d={segmentPath(140, 135, 105, 0, 500)}
              stroke="rgba(249, 184, 198, 0.35)"
              strokeWidth="38"
              fill="none"
              strokeLinecap="round"
            />

            {/* Colored bands (distinct segments with gaps) */}
            {COLOR_BANDS.map((band, i) => (
              <path
                key={i}
                d={segmentPath(140, 135, 100, band.from, band.to)}
                stroke={band.color}
                strokeWidth="28"
                fill="none"
                strokeLinecap={i === 0 || i === COLOR_BANDS.length - 1 ? 'round' : 'butt'}
              />
            ))}

            {/* Empty heart icon on the first segment (left) */}
            <text x={140 - 100 - 5} y={135 - 6} fontSize="16" fill="#F0809D" opacity="0.75" fontWeight="bold">♡</text>

            {/* Empty heart icon + sparkle on the last segment (right) */}
            <text x={140 + 100 - 12} y={135 - 6} fontSize="16" fill="#FDE4E8" opacity="0.85" fontWeight="bold">♡✨</text>

            {/* Center cover circle */}
            <circle cx={140} cy={135} r="38" fill="#FFF6EC" stroke="#F9B8C6" strokeWidth="2.5" />

            {/* "love" cursive text */}
            <text
              x={140} y={135 + 8}
              textAnchor="middle"
              style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px', fill: '#A3123F', fontWeight: 700 }}
            >
              love
            </text>

            {/* Needle */}
            <line
              x1={140} y1={135}
              x2={getNeedleCoords(140, 135, 100, value).x2} y2={getNeedleCoords(140, 135, 100, value).y2}
              stroke="#A3123F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={140} cy={135} r="8" fill="#A3123F" />
            <circle cx={140} cy={135} r="4" fill="#FFF6EC" />
          </svg>
        </div>

        {/* Slider */}
        <div className="w-full max-w-sm px-4 mt-4 sm:mt-6">
          <input
            type="range"
            min="0"
            max="500"
            value={value}
            onChange={handleSlider}
            disabled={locked}
            className="w-full custom-slider"
            style={{
              background: `linear-gradient(to right, #A3123F ${(value / 500) * 100}%, #FDE4E8 ${(value / 500) * 100}%)`
            }}
            aria-label="Love percentage slider"
            aria-valuemin={0}
            aria-valuemax={500}
            aria-valuenow={value}
          />
        </div>
      </div>
    </AnimatedBackground>
  )
}
