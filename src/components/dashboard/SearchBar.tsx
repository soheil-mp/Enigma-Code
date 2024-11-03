import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      animate={{ width: isFocused ? 300 : 200 }}
      className="relative"
    >
      <input
        type="text"
        placeholder="Search anything..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/20 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        ⌘K
      </span>
    </motion.div>
  )
} 