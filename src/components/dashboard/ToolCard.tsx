import Link from 'next/link'
import { motion } from 'framer-motion'

interface ToolCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export default function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.03, y: -8 }}
        whileTap={{ scale: 0.97 }}
        className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden h-full"
      >
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative">
          {/* Icon Container */}
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 relative"
          >
            {/* Background circles */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl transform group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-2xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 delay-100" />
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          {/* Action Button - Made more prominent */}
          <motion.div
            className="relative mx-auto w-full max-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
            <button className="relative w-full px-6 py-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl font-medium group-hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
              <span>Get Started</span>
              <motion.svg 
                className="w-4 h-4"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </button>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 