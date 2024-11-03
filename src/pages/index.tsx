import MainLayout from '@/layouts/MainLayout'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Benefits from '@/components/home/Benefits'
import DetailedFeatures from '@/components/home/DetailedFeatures'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import CaseStudies from '@/components/home/CaseStudies'
import Resources from '@/components/home/Resources'

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <Hero />
        <Features />
        <Benefits />
        <DetailedFeatures />
        <HowItWorks />
        <Testimonials />
        <CaseStudies />
        <Resources />
      </div>
    </MainLayout>
  )
} 