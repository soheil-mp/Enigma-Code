import { useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import NotificationBanner from '@/components/common/NotificationBanner'
import ParticleBackground from '@/components/effects/ParticleBackground'
import ScrollIndicator from '@/components/effects/ScrollIndicator'
import AnimatedBackground from '@/components/effects/AnimatedBackground'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Pricing from '@/components/home/Pricing'

export default function Home() {
  return (
    <MainLayout>
      <NotificationBanner />
      <div className="flex flex-col">
        {/* Hero - Dark with particles */}
        <AnimatedBackground className="bg-[#0F172A]">
          <div className="relative">
            <ParticleBackground />
            <Hero />
            <ScrollIndicator />
          </div>
        </AnimatedBackground>

        {/* Features - Dark */}
        <AnimatedBackground className="bg-gray-900">
          <Features />
        </AnimatedBackground>

        {/* HowItWorks - Light */}
        <AnimatedBackground className="bg-white">
          <HowItWorks />
        </AnimatedBackground>

        {/* Pricing - Light */}
        <AnimatedBackground className="bg-white">
          <Pricing />
        </AnimatedBackground>
      </div>
    </MainLayout>
  )
}