import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedBackground({ children, className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20 opacity-20 blur-3xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#DB2777]/20 opacity-20 blur-3xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 