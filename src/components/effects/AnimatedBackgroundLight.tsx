import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedBackgroundLight({ children, className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient orbs with lighter colors */}
      <motion.div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200 to-cyan-200 opacity-30 blur-3xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-30 blur-3xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.3, 0.2],
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