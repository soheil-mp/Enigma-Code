import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
} 