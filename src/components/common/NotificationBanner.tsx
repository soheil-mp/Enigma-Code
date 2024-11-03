import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600"
        >
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center justify-center">
                <p className="truncate font-medium text-white">
                  <span>Big news! We're excited to announce our launch. Get 50% off for the first month.</span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="/learn-more"
                  className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white hover:bg-white/30 transition-colors"
                >
                  Learn more
                </a>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex rounded-full p-1 hover:bg-white/20 transition-colors focus:outline-none"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 