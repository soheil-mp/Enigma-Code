import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DashboardHeader() {
  const { data: session } = useSession()

  const quickActions = [
    { name: 'New Resume', icon: '⚡', href: '/dashboard/resume/new' },
    { name: 'Quick Apply', icon: '🎯', href: '/dashboard/applications/quick' },
    { name: 'Practice', icon: '🎮', href: '/dashboard/interviews/practice' },
  ]

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logos/enigma-code-logo.png"
                  alt="Enigma Code"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </motion.div>
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% auto' }}
              >
                Enigma Code
              </motion.span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {quickActions.map((action) => (
                <motion.button
                  key={action.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white/80 border border-white/20 text-sm font-medium text-gray-700 transition-all duration-200"
                >
                  <span>{action.icon}</span>
                  <span>{action.name}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 border border-white/20 shadow-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-sm font-medium text-white">
                  {session?.user?.name?.[0] || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">{session?.user?.name}</span>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors border border-transparent hover:border-white/20"
              >
                Sign out
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 