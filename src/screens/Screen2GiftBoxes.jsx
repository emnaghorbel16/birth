import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedBackground, useConfetti } from '../components/SharedUI'
import Sticker from '../components/Sticker'

const gifts = [
  { id: 0, label: 'Gift 1', screen: 3, icon: '💐', hint: 'A bouquet just for you' },
  { id: 1, label: 'Gift 2', screen: 4, icon: '📸', hint: 'Our memories' },
  { id: 2, label: 'Gift 3', screen: 5, icon: '💌', hint: 'A letter from my heart' },
]

// Floating balloon
const FloatingBalloon = ({ style }) => (
  <motion.div
    className="absolute pointer-events-none text-3xl"
    style={style}
    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
  >
    🎈
  </motion.div>
)

export default function Screen2GiftBoxes({ onOpenGift, openedBoxes, onFinish }) {
  const { fire } = useConfetti()
  const allOpened = openedBoxes.length === 3
  const [hoveredId, setHoveredId] = useState(null)

  const handleBoxClick = async (gift) => {
    if (openedBoxes.includes(gift.id)) return
    await fire({ count: 60, spread: 70, origin: { x: (gift.id + 1) / 4, y: 0.5 } })
    onOpenGift(gift)
  }

  return (
    <div className="screen overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #FDE4E8 0%, #F9B8C6 50%, #FDE4E8 100%)' }}>
      {/* Animated blobs */}
      {[1, 2, 3, 4, 5].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: i % 2 === 0 ? 'rgba(249,184,198,0.4)' : 'rgba(253,228,232,0.5)',
            left: `${10 + i * 18}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating balloons */}
      {[{ left: '10%', top: '60%' }, { left: '85%', top: '50%' }, { left: '50%', top: '80%' }].map((s, i) => (
        <FloatingBalloon key={i} style={s} />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8 px-4">
        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="font-fredoka font-bold text-3xl md:text-4xl text-hotpink"
            style={{ color: '#EC5A86', textShadow: '0 2px 10px rgba(163,18,63,0.2)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            You passed the love habibi 🎁
          </motion.h1>
          <motion.p
            className="font-quicksand text-raspberry mt-2 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your birthday surprises are waiting for you
          </motion.p>
        </div>

        {/* Gift boxes */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-8 px-1 sm:px-2 w-full max-w-sm sm:max-w-md md:max-w-2xl">
          {gifts.map((gift, i) => {
            const isOpened = openedBoxes.includes(gift.id)
            const isHovered = hoveredId === gift.id
            return (
              <motion.div
                key={gift.id}
                className="flex flex-col items-center flex-1 max-w-[120px] sm:max-w-none"
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.25, duration: 0.6, type: 'spring', stiffness: 150 }}
              >
                <motion.button
                  onClick={() => handleBoxClick(gift)}
                  onHoverStart={() => !isOpened && setHoveredId(gift.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="relative focus:outline-none focus:ring-2 focus:ring-rose rounded-2xl p-0.5 sm:p-1 w-full flex justify-center"
                  aria-label={`Open ${gift.label}`}
                  whileHover={!isOpened ? { y: -8 } : {}}
                  whileTap={!isOpened ? { scale: 0.92 } : {}}
                  animate={!isOpened ? {
                    y: isHovered ? -10 : [0, -6, 0],
                    rotate: isHovered ? [-3, 3, -3, 3, 0] : [-1.5, 1.5, -1.5],
                  } : {}}
                  transition={!isOpened ? {
                    duration: isHovered ? 0.5 : 2.5 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {}}
                >
                  {isOpened ? (
                    <motion.div
                      className="w-24 sm:w-32 md:w-44 flex flex-col items-center relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="w-full flex justify-center">
                        <Sticker
                          src="/stickers/gift-open.gif"
                          alt="Open gift"
                          forceRestart={true}
                          fallback="🎁"
                          className="w-full h-auto drop-shadow-xl"
                        />
                      </div>
                      <div className="absolute -top-6 w-full flex justify-center">
                        <motion.div
                          className="bg-white/90 rounded-full px-2 sm:px-3 py-1 shadow-md text-xl sm:text-2xl"
                          animate={{ y: [-5, -20], opacity: [1, 0] }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        >
                          {gift.icon}
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-24 sm:w-32 md:w-44 origin-bottom"
                      animate={{
                        scale: isHovered ? 1.25 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                    >
                      <Sticker
                        src="/stickers/gift.gif"
                        alt="Gift box"
                        fallback="🎁"
                        className="w-full h-auto drop-shadow-2xl"
                      />
                    </motion.div>
                  )}
                </motion.button>

                {!isOpened && (
                  <p className="font-caveat text-raspberry/80 text-sm sm:text-base mt-1 sm:mt-2 font-bold tracking-wide">
                    {isHovered ? "Open! 💖" : "Tap me! ✨"}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Final button */}
        <AnimatePresence>
          {allOpened && (
            <motion.button
              className="btn-pill-pink flex items-center gap-2 shadow-lg text-lg"
              onClick={onFinish}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Continue to final surprise"
            >
              One last surprise 🎂
            </motion.button>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2 mt-2">
          {gifts.map((g) => (
            <motion.div
              key={g.id}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: openedBoxes.includes(g.id) ? '#EC5A86' : '#F9B8C6' }}
              animate={openedBoxes.includes(g.id) ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
