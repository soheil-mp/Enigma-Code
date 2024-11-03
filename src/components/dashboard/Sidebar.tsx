import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const router = useRouter()
  
  const navigation = [
    { 
      name: 'Command Center', 
      href: '/dashboard', 
      icon: '🚀',
      description: 'Your mission control'
    },
    { 
      name: 'Resume Lab', 
      href: '/dashboard/resume', 
      icon: '⚡',
      description: 'Craft your story'
    },
    { 
      name: 'Application Hub', 
      href: '/dashboard/applications', 
      icon: '🎯',
      description: 'Track your victories'
    },
    { 
      name: 'Interview Arena', 
      href: '/dashboard/interviews', 
      icon: '💫',
      description: 'Master your presence'
    },
    { 
      name: 'Market Radar', 
      href: '/dashboard/insights', 
      icon: '🌟',
      description: 'Navigate opportunities'
    },
  ]

  return (
    <nav className="w-64 bg-white/70 backdrop-blur-md border-r border-white/20">
      <div className="h-full px-3 py-4">
        <ul className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = router.pathname === item.href
            return (
              <motion.li 
                key={item.name}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex flex-col px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto text-xs opacity-50">Alt+{index + 1}</span>
                  </div>
                  <span className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                    {item.description}
                  </span>
                </Link>
              </motion.li>
            )}
          )}
        </ul>
      </div>
    </nav>
  )
} 