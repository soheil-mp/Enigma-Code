import { motion } from 'framer-motion'

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
    >
      <div className="relative w-[600px]">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 blur-3xl rounded-full" />
        
        {/* 3D Illustration */}
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
          <div className="grid grid-cols-2 gap-4">
            {/* Resume Preview */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl"
            >
              <div className="h-40 bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20 rounded-lg animate-pulse" />
              <div className="mt-3 space-y-2">
                <div className="h-4 bg-white/20 rounded animate-pulse" />
                <div className="h-4 bg-white/20 rounded w-2/3 animate-pulse" />
              </div>
            </motion.div>

            {/* Interview Assistant */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl"
            >
              <div className="h-40 bg-gradient-to-br from-[#7C3AED]/20 to-[#DB2777]/20 rounded-lg animate-pulse" />
              <div className="mt-3 space-y-2">
                <div className="h-4 bg-white/20 rounded animate-pulse" />
                <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 