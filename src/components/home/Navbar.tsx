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
      className={`w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'fixed top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg transform translate-y-0' 
          : 'absolute top-0 left-0 right-0 z-40 bg-transparent transform translate-y-0'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isMenuOpen && !isScrolled ? 'bg-gray-900/50 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
            >
              <motion.div
                animate={{
                  scale: isScrolled ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logos/enigma-code-logo.png"
                  alt="Enigma Code"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
              </motion.div>
              <motion.span 
                className={`text-xl font-bold tracking-tight ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
                animate={{
                  scale: isScrolled ? 0.95 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                Enigma Code
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 ml-16">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-all duration-300 relative
                    ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'}
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] 
                    after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {status === 'loading' ? (
              <div className="flex space-x-2">
                <div className="animate-pulse h-9 w-20 bg-white/20 rounded-lg"></div>
                <div className="animate-pulse h-9 w-24 bg-white/20 rounded-lg"></div>
              </div>
            ) : session ? (
              <motion.div className="flex items-center space-x-6">
                <Link 
                  href="/dashboard" 
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 
                    ${isScrolled 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
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
                    className="rounded-full cursor-pointer ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/40"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <>
                <motion.button
                  onClick={() => signIn()}
                  whileHover={{ scale: 1.05 }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 
                    ${isScrolled 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Sign In
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link
                    href="/auth/signup"
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 
                      ${isScrolled
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button with improved animation */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Open menu</span>
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-lg' 
                : 'bg-gray-900/50 backdrop-blur-sm'
            }`}
          >
            <div className="px-4 pt-3 pb-4 space-y-2">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isScrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              {!session && (
                <div className="pt-2 space-y-2">
                  <motion.div whileHover={{ x: 4 }}>
                    <button
                      onClick={() => {
                        signIn()
                        setIsMenuOpen(false)
                      }}
                      className={`w-full px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                        isScrolled
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Sign In
                    </button>
                  </motion.div>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href="/auth/signup"
                      className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-all ${
                        isScrolled
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 