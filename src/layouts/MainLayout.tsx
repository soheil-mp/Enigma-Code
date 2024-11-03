import { ReactNode } from 'react'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import NotificationBanner from '@/components/common/NotificationBanner'
import AnimatedBackground from '@/components/effects/AnimatedBackground'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <NotificationBanner />
      <Navbar />
      <main className="flex-grow relative z-10 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
} 