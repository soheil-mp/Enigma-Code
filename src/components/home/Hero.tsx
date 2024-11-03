import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '@/components/effects/AnimatedBackground'

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <AnimatedBackground className="relative min-h-screen overflow-hidden">
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center py-32 text-center">
          {/* Main headline with gradient text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block bg-gradient-to-r from-[#4F46E5] via-[#06B6D4] to-[#4F46E5] bg-clip-text text-transparent">
                Job Search Journey
              </span>
              <span className="block text-3xl sm:text-4xl mt-4 font-light text-gray-300">
                Powered by AI
              </span>
            </h1>
          </motion.div>
          
          {/* Enhanced subheadline with fade-in effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-12 max-w-xl text-lg text-gray-300/80"
          >
            From crafting the perfect resume to{' '}
            <span className="text-[#06B6D4]">automating applications</span>
            {' '}and{' '}
            <span className="text-[#4F46E5]">acing interviews</span>.
          </motion.p>

          {/* CTA Section with enhanced design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col items-center space-y-6"
          >
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              {/* Primary CTA with animated gradient */}
              <motion.a
                href="/auth/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] px-8 py-4 font-bold text-white shadow-lg"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#06B6D4] to-[#4F46E5] transition-transform duration-300 group-hover:translate-x-0"></div>
              </motion.a>
              
              {/* Secondary CTA with video modal */}
              <motion.button
                onClick={() => setShowDemo(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center rounded-xl bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span className="mr-2">Watch Demo</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-1 rounded-full bg-white/20 animate-ping"></div>
                  <svg
                    className="relative h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </motion.div>
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm font-medium text-gray-400"
            >
              No credit card required • 14-day free trial
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent" />

      {/* Video Modal */}
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-4xl mx-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowDemo(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              Close
            </motion.button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/your-video-id"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatedBackground>
  )
}