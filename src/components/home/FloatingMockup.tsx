import { motion } from 'framer-motion'

export default function FloatingMockup() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-[600px]"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20 blur-3xl rounded-full" />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <img
            src="/mockup.png"
            alt="Platform Preview"
            className="w-full h-auto drop-shadow-2xl rounded-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  )
} 