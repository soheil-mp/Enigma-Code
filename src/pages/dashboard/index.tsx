import DashboardLayout from '@/layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ToolCard from '@/components/dashboard/ToolCard'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '@/components/common/Tooltip'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Protect dashboard route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const tools = [
    {
      title: 'AI Resume Builder',
      description: 'Craft a stunning resume that stands out with AI-powered optimization',
      icon: '📝',
      href: '/dashboard/resume',
    },
    {
      title: 'Application Tracker',
      description: 'Supercharge your job hunt with smart application management',
      icon: '📊',
      href: '/dashboard/applications',
    },
    {
      title: 'Interview Master',
      description: 'Ace every interview with AI-powered practice and real-time coaching',
      icon: '🎯',
      href: '/dashboard/interviews',
    },
    {
      title: 'Career Insights',
      description: 'Unlock powerful market insights to make strategic career moves',
      icon: '📈',
      href: '/dashboard/insights',
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6">
        {/* Welcome Section */}
        <div className="mt-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/95 rounded-3xl p-8 border border-white/20 overflow-hidden shadow-sm"
          >
            <div className="relative">
              {/* Welcome Text */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">
                    <span className="text-gray-900 block mb-1">Ready to shine,</span>
                    <span className="text-[#6366F1] block">
                      {session?.user?.name}!
                    </span>
                  </h2>
                  <p className="mt-2 text-gray-600 text-base">
                    Your journey to success starts here. Let's make your dream job a reality!
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50/50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Weekly Progress</div>
                  <div className="mt-1 text-xl font-bold text-gray-800">+25%</div>
                </div>
                <div className="bg-purple-50/50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Active Applications</div>
                  <div className="mt-1 text-xl font-bold text-gray-800">12</div>
                </div>
                <div className="bg-green-50/50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Interview Success</div>
                  <div className="mt-1 text-xl font-bold text-gray-800">85%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <motion.div 
              key={tool.title}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">{tool.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {tool.description}
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Success Journey Section */}
        <div className="bg-[#4F46E5] rounded-3xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-xl">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Success Journey</h3>
              <p className="text-white/80 text-sm">
                Unlock achievements and watch your career soar!
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-sm">✨</span>
                </div>
                <div>
                  <div className="font-medium">Rising Star</div>
                  <div className="text-sm text-white/70">Level 1</div>
                </div>
              </div>
            </div>

            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-6">
            <h4 className="text-gray-600 text-sm">Applications Launched</h4>
            <div className="mt-2 text-2xl font-bold text-gray-800">0</div>
            <div className="mt-1 text-sm text-gray-500">Next milestone: 5</div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h4 className="text-gray-600 text-sm">Interview Opportunities</h4>
            <div className="mt-2 text-2xl font-bold text-gray-800">0</div>
            <div className="mt-1 text-sm text-gray-500">Next milestone: 3</div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h4 className="text-gray-600 text-sm">Profile Impact</h4>
            <div className="mt-2 text-2xl font-bold text-gray-800">0</div>
            <div className="mt-1 text-sm text-gray-500">Next milestone: 10</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 