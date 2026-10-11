import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { NextButton } from '../components/SharedUI'
import config from '../config'

const LETTER_TEXT = config.letterText || `Happy Birthday, my love! 🎂 You make my life feel more beautiful and meaningful, and I feel so lucky to have you. I love you wholeheartedly, and I can't wait to celebrate many more birthdays with you. You make me smile, you make me feel safe, and you bring so much happiness into my world. Thank you for being you and for filling my heart with so much love. No matter what happens, I will always choose you.`

// Typewriter hook
const useTypewriter = (text, speed = 30, startDelay = 600) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)
  const timer = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    idx.current = 0

    const startTimer = setTimeout(() => {
      timer.current = setInterval(() => {
        if (idx.current < text.length) {
          setDisplayed(text.slice(0, idx.current + 1))
          idx.current++
        } else {
          clearInterval(timer.current)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      clearInterval(timer.current)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// Ruled lines background for the letter
const RuledLines = () => (
  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-6 right-4"
        style={{
          top: `${32 + i * 28}px`,
          borderBottom: '1px solid rgba(163, 18, 63, 0.1)',
        }}
      />
    ))}
    {/* Left margin line */}
    <div
      className="absolute top-8 bottom-8"
      style={{ left: '40px', borderLeft: '1.5px solid rgba(163, 18, 63, 0.15)' }}
    />
  </div>
)

export default function Screen5Letter({ onNext }) {
  const { displayed, done } = useTypewriter(LETTER_TEXT, 28, 800)

  return (
    <div
      className="screen overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #FDE4E8 0%, #F9B8C6 50%, #FDE4E8 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tiny hearts */}
        {[1, 2, 3, 4, 5].map(i => (
          <motion.div
            key={i}
            className="absolute text-rose opacity-20"
            style={{ left: `${i * 20}%`, top: `${10 + (i % 3) * 30}%`, fontSize: '20px' }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full py-4 px-3">
        {/* Header: title + next */}
        <div className="flex items-start justify-between mb-3 px-1">
          <motion.h1
            className="font-fredoka font-bold text-xl md:text-2xl"
            style={{ color: '#EC5A86' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            A Letter From My Heart 💌
          </motion.h1>
          {done && <NextButton onClick={onNext} />}
        </div>

        {/* Main content area */}
        <div className="flex-1 flex gap-2 min-h-0">
          {/* Cat holding heart - bottom left */}
          <div className="flex flex-col justify-end">
            <motion.div
              className="w-20 md:w-28"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/images/cat-heart.png" alt="Cat holding heart" className="w-full h-auto drop-shadow-md" />
            </motion.div>
          </div>

          {/* Letter parchment */}
          <motion.div
            className="flex-1 relative rounded-xl shadow-xl overflow-hidden min-h-0"
            style={{
              background: 'linear-gradient(135deg, #FFF6EC 0%, #EFD9A8 100%)',
              border: '2px solid rgba(239,217,168,0.8)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Torn edge effect (top) */}
            <div
              className="absolute top-0 left-0 right-0 h-3"
              style={{
                background: 'radial-gradient(circle at 50% 0%, #FFF6EC 2px, transparent 2px)',
                backgroundSize: '8px 8px',
                backgroundRepeat: 'repeat-x',
              }}
            />
            {/* Torn edge effect (bottom) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-3"
              style={{
                background: 'radial-gradient(circle at 50% 100%, #FFF6EC 2px, transparent 2px)',
                backgroundSize: '8px 8px',
                backgroundRepeat: 'repeat-x',
              }}
            />

            <RuledLines />

            <div className="relative p-4 pt-6 overflow-y-auto h-full">
              {/* Letter text with typewriter */}
              <p
                className="font-caveat text-raspberry leading-relaxed text-base md:text-lg pl-8"
                style={{ minHeight: '200px' }}
              >
                {displayed}
                {!done && (
                  <span
                    className="inline-block w-0.5 h-5 bg-raspberry ml-0.5 animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </p>

              {/* Signature */}
              {done && (
                <motion.p
                  className="font-dancing text-raspberry font-bold text-right mt-4 pr-4 text-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Always, forever. ♥ {config.senderName}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Cherry blossom branch - right edge */}
          <div className="flex items-start">
            <motion.div
              className="w-8 md:w-12"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/images/blossom.png" alt="Blossom" className="w-full h-auto drop-shadow-md" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
