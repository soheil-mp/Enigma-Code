import { useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import NotificationBanner from '@/components/common/NotificationBanner'
import ParticleBackground from '@/components/effects/ParticleBackground'
import ScrollIndicator from '@/components/effects/ScrollIndicator'
import AnimatedBackground from '@/components/effects/AnimatedBackground'
import Hero from '@/components/home/Hero'
import SuccessStories from '@/components/home/SuccessStories'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Pricing from '@/components/home/Pricing'

export default function Home() {
  return (
    <MainLayout>
      <NotificationBanner />
      <div className="flex flex-col">
        {/* Hero - Rich gradient with particles */}
        <AnimatedBackground className="bg-gradient-to-br from-[#0A0F2C] via-[#1E1B4B] to-[#312E81]">
          <div className="relative">
            <ParticleBackground />
            <Hero />
            <ScrollIndicator />
          </div>
        </AnimatedBackground>

        {/* Success Stories - Light */}
        <AnimatedBackground className="bg-white">
          <SuccessStories />
        </AnimatedBackground>

        {/* Features - Deep gradient */}
        <AnimatedBackground className="bg-gradient-to-br from-[#1A1744] to-[#241D56]">
          <Features />
        </AnimatedBackground>

        {/* How It Works - Light with soft gradients */}
        <AnimatedBackground className="bg-gradient-to-r from-gray-50 via-indigo-50 to-purple-50">
          <HowItWorks />
        </AnimatedBackground>

        {/* Pricing - Clean white with subtle shadows */}
        <AnimatedBackground className="bg-white">
          <Pricing />
        </AnimatedBackground>
      </div>
    </MainLayout>
  )
}