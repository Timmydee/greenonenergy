import EnergyEstimator from '@/components/EnergyEstimator'
import Hero from '@/components/EnergyEstimator/Hero'
import Navbar from '@/global/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <Hero />
      {/* <LocationInputs /> */}
      <EnergyEstimator />
    </div>
  )
}

export default page
