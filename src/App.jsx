import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { MusicToggle } from './components/SharedUI'
import Screen0Welcome from './screens/Screen0Welcome'
import Screen1LoveOMeter from './screens/Screen1LoveOMeter'
import Screen2GiftBoxes from './screens/Screen2GiftBoxes'
import Screen3Bouquet from './screens/Screen3Bouquet'
import Screen4Memories from './screens/Screen4Memories'
import Screen5Letter from './screens/Screen5Letter'
import Screen6Cake from './screens/Screen6Cake'
import QRPage from './screens/QRPage'
import config from './config'

// Screens order: 0=Welcome, 1=Love-o-meter, 2=Gift boxes
// Gift boxes lead to: 3=Bouquet, 4=Memories, 5=Letter
// After all opened → 6=Cake

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -20 },
}

const pageTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
}

function BirthdayApp() {
  const [screen, setScreen] = useState(0)
  const [prevScreen, setPrevScreen] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openedBoxes, setOpenedBoxes] = useState([])
  const [giftSource, setGiftSource] = useState(null) // tracks where to return after gift screen
  const audioRef = useRef(null)
  const startedRef = useRef(false)

  // Background music setup
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(config.bgMusicFile)
      audio.loop = true
      audio.volume = 0.4
      audioRef.current = audio
    }
  }, [])

  const pauseBgMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }, [])

  const resumeBgMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying])

  const goTo = useCallback((nextScreen) => {
    setPrevScreen(screen)
    setScreen(nextScreen)
  }, [screen])

  // Start: play music + go to screen 1
  const handleStart = useCallback(() => {
    if (!startedRef.current && audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
      startedRef.current = true
    }
    goTo(1)
  }, [goTo])

  // Gift box opened -> show that gift's screen
  const handleOpenGift = useCallback((gift) => {
    setOpenedBoxes(prev => {
      if (prev.includes(gift.id)) return prev
      return [...prev, gift.id]
    })
    setGiftSource(2) // remember to go back to gift boxes after
    goTo(gift.screen)
  }, [goTo])

  // From gift screens (3,4,5) — go back to gift box screen
  const handleGiftNext = useCallback(() => {
    goTo(2)
  }, [goTo])

  // From gift box screen — after all opened → cake
  const handleFinishGifts = useCallback(() => {
    goTo(6)
  }, [goTo])

  // Restart
  const handleRestart = useCallback(() => {
    setOpenedBoxes([])
    setGiftSource(null)
    goTo(0)
  }, [goTo])

  const renderScreen = () => {
    switch (screen) {
      case 0:
        return <Screen0Welcome key="s0" onStart={handleStart} />
      case 1:
        return <Screen1LoveOMeter key="s1" onNext={() => goTo(2)} />
      case 2:
        return (
          <Screen2GiftBoxes
            key="s2"
            onOpenGift={handleOpenGift}
            openedBoxes={openedBoxes}
            onFinish={handleFinishGifts}
          />
        )
      case 3:
        return <Screen3Bouquet key="s3" onNext={handleGiftNext} />
      case 4:
        return (
          <Screen4Memories
            key="s4"
            onNext={handleGiftNext}
            onPauseBgMusic={pauseBgMusic}
            onResumeBgMusic={resumeBgMusic}
          />
        )
      case 5:
        return <Screen5Letter key="s5" onNext={handleGiftNext} />
      case 6:
        return <Screen6Cake key="s6" onRestart={handleRestart} />
      default:
        return <Screen0Welcome key="s0-default" onStart={handleStart} />
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ maxHeight: '100dvh' }}>
      {/* Music toggle - only show after screen 0 */}
      {screen > 0 && (
        <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
      )}


      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="absolute inset-0"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BirthdayApp />} />
      <Route path="/qr" element={<QRPage />} />
    </Routes>
  )
}
