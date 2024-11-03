import { motion } from 'framer-motion'

interface AppIconProps {
  name: 'resume' | 'applications' | 'interview' | 'insights' | 'rocket' | 'star' | 'target'
  className?: string
  animate?: boolean
}

export default function AppIcon({ name, className = "", animate = true }: AppIconProps) {
  const icons = {
    resume: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d="M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.rect
          initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          x="4" y="7" width="16" height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          initial={animate ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          d="M8 12H16M8 15H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    applications: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          initial={animate ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          d="M9 9H15M9 12H15M9 15H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    interview: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.circle
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          cx="12" cy="12" r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          d="M12 8V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    insights: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          d="M4 14L8 10L12 14L20 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          initial={animate ? { opacity: 0, x: -5 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          d="M4 20H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          initial={animate ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          d="M12 4L19 11L12 18L5 11L12 4Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          initial={animate ? { opacity: 0, y: 5 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          d="M12 8L16 12L12 16L8 12L12 8Z"
          fill="currentColor"
        />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <motion.circle
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          cx="12" cy="12" r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          cx="12" cy="12" r="2"
          fill="currentColor"
        />
      </svg>
    )
  }

  return icons[name]
} 