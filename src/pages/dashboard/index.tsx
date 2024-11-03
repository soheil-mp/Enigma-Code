import DashboardLayout from '@/layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ToolCard from '@/components/dashboard/ToolCard'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '@/components/common/Tooltip'
import Confetti from 'react-confetti'

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
      href: '/dashboard/resume',
      bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
      iconBg: 'bg-blue-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-indigo-500/20'
    },
    {
      title: 'Application Tracker',
      description: 'Supercharge your job hunt with smart application management',
      icon: '📊',
      href: '/dashboard/applications',
      bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
      iconBg: 'bg-purple-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20'
    },
    {
      title: 'Interview Master',
      description: 'Ace every interview with AI-powered practice and real-time coaching',
      icon: '🎯',
      href: '/dashboard/interviews',
      bgGradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
      iconBg: 'bg-emerald-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20'
    },
    {
      title: 'Career Insights',
      description: 'Unlock powerful market insights to make strategic career moves',
      icon: '📈',
      href: '/dashboard/insights',
      bgGradient: 'from-orange-500/10 via-amber-500/10 to-yellow-500/10',
      iconBg: 'bg-orange-100',
      hoverEffect: 'hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-amber-500/20'
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 relative"
        >
          <div className="relative bg-white rounded-[24px] p-8 shadow-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="relative">
              {/* Welcome Text with enhanced animation */}
              <motion.div 
                className="flex items-start gap-4 mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-[#EEF2FF] rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-2xl">👋</span>
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-[28px] font-semibold"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[#1F2937] block">Ready to shine,</span>
                    <motion.span 
                      className="text-[#6366F1] block mt-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {session?.user?.name}!
                    </motion.span>
                  </motion.h2>
                  <motion.p 
                    className="mt-2 text-[#4B5563] text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Your journey to success starts here. Let's make your dream job a reality!
                  </motion.p>
                </div>
              </motion.div>

              {/* Quick Stats with hover effects */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { 
                    title: 'Weekly Progress', 
                    value: '+25%', 
                    bg: 'bg-[#EEF2FF]', 
                    hover: 'hover:bg-[#E0E7FF]',
                    tooltip: 'Your progress increased by 25% this week! Keep up the great work!' 
                  },
                  { title: 'Active Applications', value: '12', bg: 'bg-[#F5F3FF]', hover: 'hover:bg-[#EDE9FE]', tooltip: 'You have 12 active job applications.' },
                  { title: 'Interview Success', value: '85%', bg: 'bg-[#ECFDF5]', hover: 'hover:bg-[#D1FAE5]', tooltip: 'You have a success rate of 85% in interviews.' }
                ].map((stat, index) => (
                  <Tooltip key={stat.title} content={stat.tooltip} placement="top">
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`${stat.bg} ${stat.hover} rounded-2xl px-5 py-4 transition-all duration-200 cursor-pointer`}
                    >
                      <div className="text-sm text-[#4B5563]">{stat.title}</div>
                      <div className="mt-1 text-xl font-semibold text-[#1F2937]">{stat.value}</div>
                    </motion.div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid with enhanced interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div 
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              onHoverStart={() => setHoveredTool(tool.title)}
              onHoverEnd={() => setHoveredTool(null)}
              className={`relative bg-white rounded-[24px] p-6 shadow-sm overflow-hidden ${tool.hoverEffect} transition-all duration-300`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-50`}></div>
              
              <div className="relative">
                <motion.div 
                  className={`w-10 h-10 ${tool.iconBg} rounded-xl flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-2xl">{tool.icon}</span>
                </motion.div>
                <h3 className="text-[#1F2937] text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-[#4B5563] text-sm mb-6">
                  {tool.description}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center group"
                >
                  Get Started
                  <motion.svg 
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                    viewBox="0 0 24 24" 
                    fill="none"
                  >
                    <path 
                      d="M9 5l7 7-7 7" 
                      stroke="currentColor" 
                      strokeWidth={2} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.button>
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