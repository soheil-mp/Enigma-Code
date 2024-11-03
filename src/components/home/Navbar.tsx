import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle navbar position on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'fixed top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg' 
          : 'absolute top-0 left-0 right-0 z-40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logos/enigma-code-logo.png"
                alt="Enigma Code"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className={`text-xl font-bold ${
                isScrolled 
                  ? 'text-gray-900' 
                  : 'text-white'
              }`}>
                Enigma Code
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-10">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
            ) : session ? (
              <motion.div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={session.user.image || '/avatars/default.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <Link
                  href="/auth/signup"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:text-gray-900' 
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              <span className="sr-only">Open menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {!session && (
                <>
                  <button
                    onClick={() => {
                      signIn()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Sign In
                  </button>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 