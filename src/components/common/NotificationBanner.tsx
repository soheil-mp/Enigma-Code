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
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] shadow-lg">
            <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center min-w-0">
                  <span className="flex rounded-lg bg-white/20 p-2">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="hidden md:inline">Big news! We're excited to announce our launch. Get 50% off for the first month.</span>
                    <span className="md:hidden">Get 50% off launch discount!</span>
                  </p>
                </div>
                <div className="flex-shrink-0 w-full flex justify-center mt-2 sm:mt-0 sm:w-auto">
                  <a
                    href="/pricing"
                    className="flex items-center justify-center px-4 py-1 rounded-full bg-white text-sm font-medium text-indigo-600 hover:bg-gray-100 transition-colors"
                  >
                    Learn more
                    <span aria-hidden="true" className="ml-1">→</span>
                  </a>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 