import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NextButton } from '../components/SharedUI'
import config from '../config'

// Music player icons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M8 5v14l11-7z"/>
  </svg>
)
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
)
const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
)
const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
)
const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
  </svg>
)
const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  </svg>
)

// Butterfly animation
const Butterfly = () => (
  <motion.div
    className="fixed pointer-events-none z-20 text-4xl"
    initial={{ x: '-10vw', y: '50vh', opacity: 0 }}
    animate={{
      x: ['−10vw', '30vw', '70vw', '110vw'],
      y: ['60vh', '30vh', '45vh', '20vh'],
      rotate: [0, 10, -10, 5],
      opacity: [0, 1, 1, 0],
    }}
    transition={{ duration: 12, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
  >
    🦋
  </motion.div>
)

export default function Screen4Memories({ onNext, onPauseBgMusic, onResumeBgMusic }) {
  const photos = config.photos || [
    { src: '/photo1.jpg', caption: 'My favorite memory with you 💕' },
    { src: '/photo2.jpg', caption: 'Every moment with you is special' },
    { src: '/photo3.jpg', caption: 'Us forever 🌸' },
  ]

  const [photoIdx, setPhotoIdx] = useState(0)
  const [rotations] = useState(() =>
    photos.map(() => (Math.random() - 0.5) * 8)
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const audioRef = useRef(null)

  // When leaving Screen 4, stop song and resume background music
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (onResumeBgMusic) {
        onResumeBgMusic()
      }
    }
  }, [onResumeBgMusic])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      // When pausing song, resume background music
      if (onResumeBgMusic) onResumeBgMusic()
    } else {
      // Pause background music before playing song.mp3
      if (onPauseBgMusic) onPauseBgMusic()
      // Start from 45s (0:45) on first play
      if (audioRef.current.currentTime < 45) {
        audioRef.current.currentTime = 45
      }
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying, onPauseBgMusic, onResumeBgMusic])

  const handleNext = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    if (onResumeBgMusic) {
      onResumeBgMusic()
    }
    if (onNext) {
      onNext()
    }
  }, [onNext, onResumeBgMusic])

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const t = audioRef.current.currentTime
    const d = audioRef.current.duration || 1
    setCurrentTime(t)
    setProgress((t / d) * 100)
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    const d = audioRef.current.duration || 1
    const t = (parseFloat(e.target.value) / 100) * d
    audioRef.current.currentTime = t
  }

  const handleEnded = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    } else {
      setIsPlaying(false)
      // Song finished: resume background music
      if (onResumeBgMusic) onResumeBgMusic()
    }
  }

  const formatTime = (s) => {
    if (isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const nextPhoto = () => setPhotoIdx(i => (i + 1) % photos.length)
  const prevPhoto = () => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)

  return (
    <div className="screen bg-scrapbook overflow-hidden relative">
      <audio
        ref={audioRef}
        src={config.songFile}
        onPlay={() => {
          setIsPlaying(true)
          if (onPauseBgMusic) onPauseBgMusic()
        }}
        onPause={() => {
          setIsPlaying(false)
          if (onResumeBgMusic) onResumeBgMusic()
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          const d = e.target.duration || 1
          setDuration(d)
          if (e.target.currentTime < 45) {
            e.target.currentTime = 45
            setCurrentTime(45)
            setProgress((45 / d) * 100)
          }
        }}
        onEnded={handleEnded}
      />

      <Butterfly />

      {/* Scrapbook collage background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vintage ticket stubs */}
        <motion.div
          className="absolute top-6 left-2 w-20"
          style={{ transform: 'rotate(-8deg)' }}
          animate={{ rotate: [-8, -5, -8] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="bg-cream border-2 border-kraft rounded px-2 py-1">
            <p className="font-caveat text-[8px] text-raspberry font-bold">LOVE PASS</p>
            <p className="font-caveat text-[7px] text-raspberry/70">Admit one</p>
            <p className="font-caveat text-[7px] text-raspberry/70">{config.birthdayDate}</p>
            <div className="border-t border-dashed border-kraft mt-1 pt-1">
              <p className="font-caveat text-[6px] text-raspberry/50">BIRTHDAY PASS 💕</p>
            </div>
          </div>
        </motion.div>

        {/* Cherry blossoms / flowers */}
        <div className="absolute bottom-0 left-0 text-5xl opacity-60" style={{ transform: 'rotate(-20deg)' }}>🌸</div>
        <div className="absolute top-16 left-6 text-3xl opacity-50">🌸</div>
        <div className="absolute top-2 right-20 text-3xl opacity-50">🦋</div>

        {/* Envelope with heart */}
        <motion.div
          className="absolute bottom-8 right-2 text-4xl opacity-70"
          animate={{ rotate: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💌
        </motion.div>

        {/* Lace fabric */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #F9B8C6 8px, #F9B8C6 10px)',
          }}
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-4 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #F9B8C6 8px, #F9B8C6 10px)',
          }}
        />

        {/* Lily flowers */}
        <div className="absolute top-1/3 left-2 text-5xl opacity-50" style={{ transform: 'rotate(15deg)' }}>🌷</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-4 px-4">
        {/* Next button */}
        <div className="w-full flex justify-end">
          <NextButton onClick={handleNext} />
        </div>

        {/* Polaroid photo */}
        <div className="flex flex-col items-center mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIdx}
              className="polaroid"
              style={{
                rotate: rotations[photoIdx],
                width: 'min(260px, 75vw)',
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: rotations[photoIdx] - 5 }}
              animate={{ opacity: 1, scale: 1, rotate: rotations[photoIdx] }}
              exit={{ opacity: 0, scale: 0.85, rotate: rotations[photoIdx] + 5 }}
              transition={{ duration: 0.4 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) nextPhoto()
                else if (info.offset.x > 50) prevPhoto()
              }}
            >
              <div
                className="overflow-hidden"
                style={{ aspectRatio: '4/3', background: '#F9B8C6' }}
              >
                <img
                  src={photos[photoIdx].src}
                  alt={photos[photoIdx].caption || 'Our memory'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (e.target.src.includes('collage.jpg')) return
                    e.target.src = '/images/us/collage.jpg'
                  }}
                />
              </div>
              <p className="font-caveat text-raspberry text-center mt-2 text-sm px-1">
                {photos[photoIdx].caption || ''}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Photo navigation dots */}
          {photos.length > 1 && (
            <div className="flex gap-2 mt-3">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === photoIdx ? '#EC5A86' : '#F9B8C6' }}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
          <p className="font-quicksand text-xs text-raspberry/50 mt-1">← Swipe →</p>
        </div>

        {/* Music player */}
        <motion.div
          className="w-full max-w-sm music-player px-4 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Song info */}
          <div className="flex items-center gap-3 mb-3">
            {/* Album cover */}
            <div
              className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #EC5A86, #A3123F)' }}
            >
              🎵
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-fredoka font-semibold text-raspberry text-sm truncate">
                {config.songTitle}
              </p>
              <p className="font-quicksand text-raspberry/70 text-xs truncate">
                {config.songArtist}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5"
              aria-label="Music progress"
            />
            <div className="flex justify-between font-quicksand text-xs text-raspberry/50 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsShuffled(s => !s)}
              className={`rounded-full w-8 h-8 flex items-center justify-center transition-colors ${isShuffled ? 'text-hotpink' : 'text-raspberry/40'}`}
              aria-label="Shuffle"
              aria-pressed={isShuffled}
            >
              <ShuffleIcon />
            </button>
            <button
              onClick={() => { if (audioRef.current) audioRef.current.currentTime = 45 }}
              className="text-raspberry/60 hover:text-raspberry rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <PrevIcon />
            </button>
            <motion.button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #EC5A86, #A3123F)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </motion.button>
            <button
              onClick={() => { if (audioRef.current) audioRef.current.currentTime = duration }}
              className="text-raspberry/60 hover:text-raspberry rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <NextIcon />
            </button>
            <button
              onClick={() => setIsRepeat(r => !r)}
              className={`rounded-full w-8 h-8 flex items-center justify-center transition-colors ${isRepeat ? 'text-hotpink' : 'text-raspberry/40'}`}
              aria-label="Repeat"
              aria-pressed={isRepeat}
            >
              <RepeatIcon />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
