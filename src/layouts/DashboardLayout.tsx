import { ReactNode } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { motion } from 'framer-motion'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
      {/* Enhanced Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Colorful gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[800px] h-[800px] bg-gradient-to-r from-violet-300/30 to-fuchsia-300/30 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-[800px] h-[800px] bg-gradient-to-l from-cyan-300/30 to-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.4, 0.3] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 left-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-pink-300/30 to-yellow-300/30 rounded-full mix-blend-multiply filter blur-3xl"
        />
        
        {/* Enhanced grid pattern with animated gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse-soft" />
        </div>

        {/* Floating particles with rainbow colors */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                ['bg-pink-400', 'bg-purple-400', 'bg-indigo-400', 'bg-blue-400', 'bg-cyan-400', 'bg-teal-400'][i % 6]
              }`}
              animate={{
                x: ['0%', '100%', '0%'],
                y: ['0%', '100%', '0%'],
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Rainbow sparkles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(${Math.random() * 360}deg, #ff0080, #7928ca)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header with enhanced glass effect */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/30 shadow-lg shadow-white/10">
        <DashboardHeader />
      </div>

      {/* Main content */}
      <main className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Enhanced glass-morphism content wrapper */}
          <div className="relative z-10 space-y-8 backdrop-blur-xl bg-white/70 rounded-[32px] shadow-xl shadow-indigo-500/10 border border-white/30 p-8 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
            {children}
          </div>

          {/* Enhanced decorative bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-50/50 to-transparent pointer-events-none" />
        </motion.div>
      </main>

      {/* Animated styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 4s ease-in-out infinite;
        }

        .animate-rainbow {
          animation: rainbow 10s linear infinite;
        }
      `}</style>
    </div>
  )
} 