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
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {description}
            </p>
          </div>

          {/* Action Indicator */}
          <div className="flex items-center justify-center mt-4">
            <motion.div
              className="flex items-center gap-2 text-sm font-medium text-blue-500"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 