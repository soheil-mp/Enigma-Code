import DashboardLayout from '@/layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ToolCard from '@/components/dashboard/ToolCard'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '@/components/common/Tooltip'
import Confetti from 'react-confetti'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [showAchievement, setShowAchievement] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
      href: '/resume-builder',
      bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
      iconBg: 'bg-blue-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-indigo-500/20'
    },
    {
      title: 'Application Tracker',
      description: 'Supercharge your job hunt with smart application management',
      icon: '📊',
      href: '/application-tracker',
      bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
      iconBg: 'bg-purple-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20'
    },
    {
      title: 'Interview Master',
      description: 'Ace every interview with AI-powered practice and real-time coaching',
      icon: '🎯',
      href: '/interview-master',
      bgGradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
      iconBg: 'bg-emerald-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20'
    },
    {
      title: 'Career Insights',
      description: 'Unlock powerful market insights to make strategic career moves',
      icon: '📈',
      href: '/career-insights',
      bgGradient: 'from-orange-500/10 via-amber-500/10 to-yellow-500/10',
      iconBg: 'bg-orange-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-amber-500/20'
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
        {/* Welcome Section - Enhanced with better gradients and animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 relative"
        >
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/20 overflow-hidden">
            {/* Enhanced glass morphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl" />
            
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <div className="relative">
              {/* Welcome Text with enhanced animation and typography */}
              <motion.div 
                className="flex items-start gap-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-3xl">👋</span>
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-[32px] font-bold"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-gray-900 block">Welcome back,</span>
                    <motion.span 
                      className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent block mt-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {session?.user?.name}!
                    </motion.span>
                  </motion.h2>
                  <motion.p 
                    className="mt-2 text-gray-600 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Let's make your dream job a reality today.
                  </motion.p>
                </div>
              </motion.div>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { 
                    title: 'Weekly Progress', 
                    value: '+25%', 
                    bg: 'bg-gradient-to-br from-violet-50 to-fuchsia-50', 
                    border: 'border-violet-100',
                    icon: '📈',
                    tooltip: 'Your progress increased by 25% this week!' 
                  },
                  { 
                    title: 'Active Applications', 
                    value: '12', 
                    bg: 'bg-gradient-to-br from-pink-50 to-rose-50', 
                    border: 'border-pink-100',
                    icon: '📝',
                    tooltip: 'You have 12 active job applications.' 
                  },
                  { 
                    title: 'Interview Success', 
                    value: '85%', 
                    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50', 
                    border: 'border-emerald-100',
                    icon: '🎯',
                    tooltip: 'Your interview success rate is 85%!' 
                  }
                ].map((stat, index) => (
                  <Tooltip key={stat.title} content={stat.tooltip} placement="top">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`${stat.bg} backdrop-blur-xl rounded-2xl px-6 py-5 border ${stat.border} shadow-lg shadow-gray-100/20 transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{stat.icon}</span>
                        <div className="text-sm text-gray-600 font-medium">{stat.title}</div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                    </motion.div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div 
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white/90 backdrop-blur-xl rounded-[24px] p-6 shadow-xl border border-white/20 overflow-hidden group"
            >
              {/* Enhanced background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              <div className="relative">
                <motion.div 
                  className={`w-12 h-12 ${tool.iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  <span className="text-2xl">{tool.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-6">
                  {tool.description}
                </p>
                <Link href={tool.href}>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-200 flex items-center justify-center group"
                  >
                    Get Started
                    <motion.svg 
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Journey Section with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#6366F1] rounded-[24px] p-8 overflow-hidden relative"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-purple-600/50"></div>
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2"
              >
                <span className="text-xl">🚀</span>
              </motion.div>
              <div>
                <h3 className="text-white text-xl font-semibold">Your Success Journey</h3>
                <p className="text-white/80 text-sm">
                  Unlock achievements and watch your career soar!
                </p>
              </div>
            </div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
                >
                  <span className="text-sm">✨</span>
                </motion.div>
                <div>
                  <div className="text-white font-medium">Rising Star</div>
                  <div className="text-white/70 text-sm">Level 1</div>
                </div>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '25%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid with hover effects */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: 'Applications Launched', value: '0', milestone: '5', icon: '🚀' },
            { title: 'Interview Opportunities', value: '0', milestone: '3', icon: '💼' },
            { title: 'Profile Impact', value: '0', milestone: '10', icon: '📈' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[24px] px-6 py-5 relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{stat.icon}</span>
                  <h4 className="text-[#4B5563] text-sm">{stat.title}</h4>
                </div>
                <div className="mt-2 text-[28px] font-semibold text-[#1F2937]">{stat.value}</div>
                <div className="mt-1 text-sm text-[#6B7280]">Next milestone: {stat.milestone}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">New Achievement!</h4>
                <p className="text-sm text-gray-600">You're making great progress!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}
      </div>
    </DashboardLayout>
  )
} 