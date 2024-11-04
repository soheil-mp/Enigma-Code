import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ProfileInitials from '../common/ProfileInitials'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and left side nav items */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="Enigma Code" className="h-8 w-auto" />
              <span className="ml-2 text-white font-semibold">Enigma Code</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white">
                Pricing
              </Link>
            </div>
          </div>

          {/* Right side nav items */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
                <ProfileInitials 
                  name={session.user?.name || 'User'} 
                  className="h-8 w-8 text-sm cursor-pointer"
                />
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-gray-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 