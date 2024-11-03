import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DashboardHeader() {
  const { data: session } = useSession()

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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                {session?.user?.name?.[0] || 'U'}
              </div>
              <span className="text-gray-700 font-medium hidden sm:block">
                {session?.user?.name}
              </span>
            </div>
            <button 
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 