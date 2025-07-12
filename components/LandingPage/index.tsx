import React from 'react'
import Hero from '@/components/LandingPage/Hero'
import HowItWorks from './HowItWorks'
import WhyChoose from './WhyChoose'
import CTASection from './Cta'
import ImpactSection from './Impact'

const index = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <CTASection />
      <ImpactSection />
    </div>
  )
}

export default index