import { ReactNode } from 'react'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import NotificationBanner from '@/components/common/NotificationBanner'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NotificationBanner />
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
} 