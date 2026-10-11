import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfetti } from '../components/SharedUI'
import Sticker from '../components/Sticker'
import config from '../config'

const CANDLE_COUNT = Math.min(config.age || 5, 8) // Max 8 candles displayed

export default function Screen6Cake({ onRestart }) {
  const [candlesLit, setCandlesLit] = useState(() =>
    Array.from({ length: CANDLE_COUNT }, (_, i) => i)
  )
  const [allBlown, setAllBlown] = useState(false)
  const [listening, setListening] = useState(false)
  const [micPermission, setMicPermission] = useState(null) // null | 'granted' | 'denied'
  const [wishText, setWishText] = useState(false)
  const { fireworks, fire } = useConfetti()
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const frameRef = useRef(null)

  const blowOutCandle = useCallback(() => {
    setCandlesLit(prev => {
      if (prev.length === 0) return prev
      const next = prev.slice(0, -1)
      if (next.length === 0) {
        setTimeout(() => {
          setAllBlown(true)
          fireworks()
          setWishText(true)
        }, 500)
      }
      return next
    })
  }, [fireworks])

  // Manual blow button
  const handleBlowBtn = () => {
    blowOutCandle()
  }

  // Mic detection
  const startMicListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission('granted')
      setListening(true)

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      audioCtxRef.current = audioCtx
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)

      const check = () => {
        analyser.getByteFrequencyData(data)
        const avg = data.reduce((a, b) => a + b, 0) / data.length
        if (avg > 35) {
          blowOutCandle()
        }
        frameRef.current = requestAnimationFrame(check)
      }
      check()
    } catch {
      setMicPermission('denied')
    }
  }

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {})
    }
  }, [])

  return (
    <div
      className="screen overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #FDE4E8 0%, #F9B8C6 40%, #FFF6EC 80%, #FDE4E8 100%)' }}
    >
      {/* Floating elements */}
      {!allBlown && Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-2xl"
          style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          🕯️
        </motion.div>
      ))}

      {/* Fireworks / celebration particles after blown */}
      {allBlown && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: `${Math.random() * 100}%` }}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: [0, 360] }}
              transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
            >
              <span style={{ fontSize: `${16 + Math.random() * 20}px` }}>
                {['🎊', '🎉', '🎈', '✨', '💕', '⭐', '🌸'][Math.floor(Math.random() * 7)]}
              </span>
            </motion.div>
          ))}
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8 px-6">
        {/* Prompt text */}
        {!allBlown ? (
          <motion.p
            className="font-quicksand font-semibold text-center text-raspberry text-lg md:text-xl"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Make a wish… then blow out the candles 🕯️
          </motion.p>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h1
              className="font-fredoka font-bold text-3xl md:text-4xl"
              style={{ color: '#EC5A86', textShadow: '0 2px 15px rgba(163,18,63,0.3)' }}
            >
              Happy Birthday {config.partnerName}! 🎉
            </h1>
          </motion.div>
        )}

        <AnimatePresence>
          {allBlown && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sticker src="/stickers/confetti.gif" alt="Confetti" loop={false} fallback="🎊" className="absolute w-full h-full" />
              <Sticker src="/stickers/balloons.gif" alt="Balloons" fallback="🎈" className="absolute w-full h-full opacity-70" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake */}
        <motion.div
          className="w-64 md:w-80 flex-shrink-0 relative my-2 cursor-pointer"
          animate={allBlown ? { 
            scale: [1, 1.08, 1], 
            y: [0, -12, 0],
            rotate: [-1, 1, -1] 
          } : { 
            y: [0, -6, 0] 
          }}
          transition={{ 
            duration: allBlown ? 1.4 : 3.5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
        >
          <Sticker 
            src="/stickers/cake.gif" 
            alt="Birthday Cake" 
            fallback="🎂" 
            className="w-full h-auto drop-shadow-2xl" 
          />
        </motion.div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-4 w-full">
          {!allBlown ? (
            <>
              {/* Mic or tap options */}
              {micPermission !== 'granted' && (
                <motion.button
                  onClick={startMicListening}
                  className="btn-pill flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Use microphone to blow out candles"
                >
                  🎤 Blow into mic
                </motion.button>
              )}

              {micPermission === 'denied' && (
                <p className="font-quicksand text-xs text-raspberry/60">
                  Mic not available — use the button below
                </p>
              )}

              {listening && (
                <motion.div
                  className="flex items-center gap-2 font-quicksand text-sm text-raspberry"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-hotpink" />
                  Listening… blow into the mic! 🎤
                </motion.div>
              )}

              <motion.button
                onClick={handleBlowBtn}
                className="btn-pill-pink flex items-center gap-2 text-lg"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Tap to blow out a candle"
              >
                💨 Blow! ({candlesLit.length} left)
              </motion.button>

              {/* Candle progress */}
              <div className="flex gap-1.5">
                {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: candlesLit.includes(i) ? '#F5C26B' : '#ccc',
                      boxShadow: candlesLit.includes(i) ? '0 0 6px #F5C26B' : 'none',
                    }}
                    animate={candlesLit.includes(i) ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Final message */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-dancing text-2xl text-raspberry">
                  I love you ❤️
                </p>
                <p className="font-quicksand text-raspberry/70 text-sm mt-1">
                  From {config.senderName}, with all my heart 💕
                </p>
              </motion.div>

              {/* Start again */}
              <motion.button
                onClick={onRestart}
                className="btn-pill flex items-center gap-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                aria-label="Restart the experience"
              >
                🔄 Start again
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
